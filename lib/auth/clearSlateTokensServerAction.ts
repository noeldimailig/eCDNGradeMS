import { db } from "@/db"
import { verificationTokens } from "@/db/schema"
import { lt } from "drizzle-orm"

export const clearStaleTokens = async () => {
  try {
    await db.delete(verificationTokens).where(lt(verificationTokens.expires, new Date()))
  } catch (error) {
    console.error("Failed to clear stale tokens:", error)
    throw error
  }
}