"use server";

import { auth } from "@/lib/auth/auth";
import { db } from "@/db";
import { student } from "@/db/schema";
import { eq } from "drizzle-orm";

export const fetchStudentId = async (): Promise<string | null> => {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const uuid = session.user?.id as string;

  try {
    const result = await db
      .select({ studentId: student.studentId })
      .from(student)
      .where(eq(student.userId, uuid))
      .limit(1);

    return result[0]?.studentId || null; // Return null if no student ID exists
  } catch (error) {
    console.error("Error fetching Student ID:", error);
    throw error;
  }
};
