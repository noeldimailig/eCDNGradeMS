"use server"
import { db, users, verificationTokens } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function verifyEmail(token: string) {
    try {
      const tokenRecord = await db.select().from(verificationTokens).where(eq(verificationTokens.token, token)).execute();
  
      if (!tokenRecord || tokenRecord.length === 0) {
        return { success: false, error: "Invalid or expired token." };
      }
  
      const { identifier } = tokenRecord[0];
  
      await db.update(users).set({ emailVerified: new Date() }).where(eq(users.email, identifier)).execute();
      await db.delete(verificationTokens).where(eq(verificationTokens.token, token)).execute();
  
      return { success: true };
    } catch (error) {
      console.error("Email verification error:", error);
      return { success: false, error: "Email verification failed." };
    }
  }
  