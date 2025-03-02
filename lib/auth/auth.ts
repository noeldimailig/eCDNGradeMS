import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { setName } from "@/lib/auth/setNameServerAction";
import { clearStaleTokens } from "@/lib/auth/clearSlateTokensServerAction";
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import {eq, sql} from "drizzle-orm";
import bcrypt from "bcryptjs"

import { db, accounts, sessions, users, student, verificationTokens } from "@/db/schema"

export const {handlers, signIn, signOut, auth} = NextAuth({
  adapter: DrizzleAdapter(db,
    {
      usersTable: users,
      accountsTable: accounts,
      sessionsTable: sessions,
      verificationTokensTable: verificationTokens,
    }
  ),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, credentials.email as string))
            .execute()

          if (!user || !user.password) {
            return null
          }

          const isValidPassword = await bcrypt.compare(
            credentials.password as string,
            user.password
          )

          if (!isValidPassword) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          }
        } catch (error) {
          console.error("Error during credentials authentication:", error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days in seconds (this value is also the default)
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "credentials") {
        const [existingUser] = await db
          .select()
          .from(users)
          .where(eq(users.email, user.email as string))
          .execute();
    
        console.log("Existing user:", existingUser);
    
        if (!existingUser) {
          try {
            // Create new user
            const [newUser] = await db
              .insert(users)
              .values({
                id: sql`uuid_generate_v4()`,
                email: user.email as string,
                name: user.name,
                role: "Student",
                image: user.image as string,
              })
              .returning({ id: users.id });
    
            console.log("New user created:", newUser.id);
    
            // Create student record
            const [newStudent] = await db.insert(student).values({
              id: sql`uuid_generate_v4()`,
              userId: newUser.id,  // Ensure correct column name
            }).returning();
    
            console.log("New student created:", newStudent);
          } catch (error) {
            console.error("Error inserting user or student:", error);
          }
        }
      }
      return true;
    },    
    async jwt({ token, user, session, trigger }) {
      if (trigger === "update" && session?.name !== token.name) {
        token.name = session.name;

        try {
          await setName(token.name as string);
        } catch (error) {
          console.error("Failed to set user name:", error);
        }
      }

      if (user) {
        await clearStaleTokens();
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        try {
          const [studentRecord] = await db
            .select({ studentId: student.studentId }) // Select the student.id from student table
            .from(student)
            .where(eq(student.userId, token.id as string))
            .execute();

          if (studentRecord && studentRecord.studentId) {
            return {
              ...session,
              user: {
                ...session.user,
                id: token.id as string,
                studentId: studentRecord.studentId, // Add studentId to the session
              },
            };
          }
        } catch (error) {
          console.error("Error fetching student ID:", error);
        }
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
      }
    },
  },
  secret: process.env.AUTH_SECRET,
  }
)
