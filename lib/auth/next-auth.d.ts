import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    studentId?: string; // ✅ Add studentId here
  }

  interface Session {
    user: User; // ✅ Ensure the session user uses the extended User type
  }
}
