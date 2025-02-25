import { auth } from "@/lib/auth/auth"
import { db } from "@/db"
import { accounts } from "@/db/schema"
import { and, eq } from "drizzle-orm"

export const getAccountLinkStatus = async () => {
  const session = await auth()
  if (!session) {
    throw new Error("Unauthorized")
  }

  const uuid = session.user?.id as string

  try {
    const result = await db
      .select({ count: accounts.userId })
      .from(accounts)
      .where(and(eq(accounts.provider, "google"), eq(accounts.userId, uuid)))

    return result.length > 0
  } catch (error) {
    console.error("Failed to check if user has Google account linked:", error)
    throw error
  }
}

