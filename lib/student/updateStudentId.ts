"use server";

import { auth } from "@/lib/auth/auth";
import { db } from "@/db";
import { student } from "@/db/schema";
import { eq } from "drizzle-orm";

export const updateStudentId = async (studentId: string) => {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const uuid = session.user?.id as string;

  try {
    await db
      .update(student)
      .set({ studentId: studentId })
      .where(eq(student.userId, uuid));

    return true ;
  } catch (error) {
    console.error("Error updating Student ID:", error);
    throw error;
  }
};
