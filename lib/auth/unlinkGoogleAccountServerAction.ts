import { auth } from "@/lib/auth/auth"
import { db } from "@/db"
import { accounts } from "@/db/schema"
import { and, eq } from "drizzle-orm"

export const unlinkGoogleAccount = async () => {
  const session = await auth()
  if (!session) {
    throw new Error("Unauthorized")
  }

  const uuid = session.user?.id

  try {
    await db.delete(accounts).where(and(eq(accounts.provider, "google"), eq(accounts.userId, uuid)))

    return true
  } catch (error) {
    console.error("Failed to unlink Google account:", error)
    throw error
  }
}

