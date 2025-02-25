import { auth } from "@/lib/auth/auth"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

export const setName = async (name: string) => {
  const session = await auth()
  if (!session) {
    throw new Error("Unauthorized")
  }

  const uuid = session.user?.id as string
  name = name.trim()

  try {
    await db.update(users).set({ name }).where(eq(users.id, uuid))

    return true
  } catch (error) {
    console.error("Failed to set user name:", error)
    throw error
  }
}

