"use server";

import { db } from "@/db";
import { temporaryGrades, academicYear, semester, course, courseSemester } from "@/db/schema";
import { auth } from "@/lib/auth/auth";
import { eq } from "drizzle-orm";

interface AcademicYear {
    id: string | null;
    academicYear: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

interface Semester {
    semesterId: string | null;
    semester: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

interface Grade {
    id: string;
    student_id: string | null;
    studentName: string | null;
    midtermGrade: number | null;
    tentativeFinalGrade: number | null;
    finalGrade: number | null;
    yearLevel: number | null;
    courseCode: string | null;
    courseDescription: string | null;
    remarks: string | null;
    academicYear: string | null; // Added academicYear
    semester: string | null; // Added semester
}

export async function getGrades(): Promise<Grade[]> {
  try {
    const session = await auth();
    const studentId = session?.user?.studentId as string;

    if (!studentId) {
      return [];
    }

    // Fetch grades and join with courses, academicYear, semester, and courseSemester
    const grades = await db
      .select({
        id: temporaryGrades.id,
        student_id: temporaryGrades.student_id,
        studentName: temporaryGrades.studentName,
        midtermGrade: temporaryGrades.midtermGrade,
        tentativeFinalGrade: temporaryGrades.tentativeFinalGrade,
        finalGrade: temporaryGrades.finalGrade,
        courseCode: course.courseCode,
        courseDescription: course.courseName,
        yearLevel: course.yearLevel,
        remarks: temporaryGrades.remarks,
        academicYear: academicYear.academicYear,
        // program: program.programName,
        // department: department.name,
        semester: semester.semester,
      })
      .from(temporaryGrades)
      .innerJoin(courseSemester, eq(temporaryGrades.courseSemesterId, courseSemester.courseSemesterId)) // Join directly with courseSemester
      .innerJoin(course, eq(courseSemester.courseId, course.courseId))
      .innerJoin(academicYear, eq(courseSemester.academicYearId, academicYear.id))
      .innerJoin(semester, eq(courseSemester.semesterId, semester.semesterId))
      .where(eq(temporaryGrades.student_id, studentId)); // Filter by studentId

    return grades as Grade[];
  } catch (error) {
    console.error("Error fetching grades:", error);
    throw error;
  }
}

export async function getAcademicYears() {
    try {
        const years = await db.select().from(academicYear);
        return years as AcademicYear[];
    } catch (error) {
        console.error("Error fetching academic years:", error);
        return [];
    }
}

export async function getSemesters() {
    try {
        const semesters = await db.select().from(semester);
        return semesters as Semester[];
    } catch (error) {
        console.error("Error fetching semesters:", error);
        return [];
    }
}