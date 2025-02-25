import { auth } from "@/lib/auth/auth"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"

export const getUserRole = async () => {
  const session = await auth()

  if (!session) {
    redirect("/sign-in");
    throw new Error("Unauthorized")
  }

  const uuid = session.user?.id as string

  try {
    const result = await db.select({ role: users.role }).from(users).where(eq(users.id, uuid))

    return result[0]?.role
  } catch (error) {
    console.error("Failed to get user role:", error)
    throw error
  }
}