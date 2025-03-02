import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum,
  uuid,
  numeric,
  varchar,
} from "drizzle-orm/pg-core";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import type { AdapterAccountType } from "next-auth/adapters";

const connectionString = process.env.AUTH_DRIZZLE_URL as string;

const pool = postgres(connectionString, { max: 1 });

export const db = drizzle(pool);

// ✅ Define Enum for Role
export const userRoleEnum = pgEnum("user_role", ["Student", "Instructor", "Admin"]);

import { sql } from "drizzle-orm";

export const users = pgTable("user", {
  id: uuid("id").primaryKey().default(sql`uuid_generate_v4()`), // ✅ Proper default function call
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  password: text("password"),
  role: userRoleEnum("role").default("Student"),
  image: text("image"),
});


export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ]
);

export const academicYear = pgTable("academic_year", {
  id: uuid("id").primaryKey().defaultRandom(),
  academicYear: text("academic_year").notNull().unique(),
  status: boolean("status").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const departments = pgTable("department", {
  departmentId: uuid("department_id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  abbreviation: text("abbreviation").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const grades = pgTable("grades", {
  id: uuid("id").primaryKey().defaultRandom(),
  gradingPeriod: text("grading_period")
    .notNull(),
  grade: numeric("grade", { precision: 5, scale: 2 }).notNull(),
  numericalEquivalent: numeric("numerical_equivalent", { precision: 5, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Course Table
export const course = pgTable("course", {
  courseId: uuid("course_id").defaultRandom().primaryKey(),
  courseCode: varchar("course_code", { length: 20 }).notNull().unique(),
  courseName: varchar("course_name", { length: 255 }).notNull(),
  units: integer("units").notNull(),
  lectureHours: integer("lecture_hours").notNull(),
  labHours: integer("lab_hours").notNull(),
  prerequisites: uuid("prerequisites").array().default([]),
  programId: uuid("program_id").notNull().references(() => program.programId, { onDelete: "cascade" }),
  yearLevel: integer("year_level").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const courseSemester = pgTable("course_semester", {
  courseSemesterId: uuid("course_semester_id").defaultRandom().primaryKey(),
  courseId: uuid("course_id").notNull().references(() => course.courseId),
  academicYearId: uuid("academic_year_id").notNull().references(() => academicYear.id, { onDelete: "cascade" }),
  semesterId: uuid("semester_id").notNull().references(() => semester.semesterId, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Class Table
export const classTable = pgTable("class", {
  id: uuid("id").defaultRandom().primaryKey(),
  courseId: uuid("course_id").notNull().references(() => course.courseId),
  instructorId: uuid("instructor_id").notNull().references(() => instructor.id, { onDelete: "set null" }),
  academicYearId: uuid("academic_year_id").notNull().references(() => academicYear.id, { onDelete: "cascade" }),
  semesterId: uuid("semester_id").notNull().references(() => semester.semesterId, { onDelete: "cascade" }),
  sectionId: text("section_id").notNull().references(() => section.id, { onDelete: "cascade" }),
  schedule: text("schedule").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Department Table
export const department = pgTable("department", {
  departmentId: uuid("department_id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  abbreviation: varchar("abbreviation", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Grading Category Table
export const gradingCategory = pgTable("grading_category", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Grading Criterion Table
export const gradingCriterion = pgTable("grading_criterion", {
  id: uuid("id").defaultRandom().primaryKey(),
  gradingCategoryId: uuid("grading_category_id").references(() => gradingCategory.id, { onDelete: "cascade" }),
  description: text("description").notNull(),
  weight: numeric("weight", { precision: 5, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Grading Criterion Items Table
export const gradingCriterionItems = pgTable("grading_criterion_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  gradingCriterionId: uuid("grading_criterion_id").references(() => gradingCriterion.id, { onDelete: "cascade" }),
  description: text("description").notNull(),
  totalItems: integer("total_items").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Grading Criterion Items Mapping Table
export const gradingCriterionItemsMapping = pgTable("grading_criterion_items_mapping", {
  id: uuid("id").defaultRandom().primaryKey(),
  gradeId: uuid("grade_id").references(() => grades.id, { onDelete: "cascade" }),
  gradingCriterionItemsId: uuid("grading_criterion_items_id").references(() => gradingCriterionItems.id, { onDelete: "cascade" }),
  score: numeric("score", { precision: 5, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Instructor Table
export const instructor = pgTable("instructor", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: varchar("firstname", { length: 100 }).notNull(),
  middleName: varchar("middle_name", { length: 100 }),
  lastName: varchar("lastname", { length: 100 }).notNull(),
  suffix: varchar("suffix", { length: 10 }),
  gender: varchar("gender", { length: 10 }).$type<"Male" | "Female" | "Other">(),
  contactNo: varchar("contact_no", { length: 15 }),
  userId: text("user_id").notNull().unique().references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Program Table
export const program = pgTable("program", {
  programId: uuid("program_id").defaultRandom().primaryKey(),
  programName: varchar("program_name", { length: 255 }).notNull(),
  departmentId: uuid("department_id").notNull().references(() => department.departmentId, { onDelete: "cascade" }),
  major: varchar("major", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const section = pgTable("section", {
  id: text("id").primaryKey().default("gen_random_uuid()"),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const semester = pgTable("semester", {
  semesterId: uuid("semester_id").primaryKey().default("uuid_generate_v4()"),
  semester: varchar("semester", { length: 50 }).notNull().unique(),
  status: boolean("status").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const student = pgTable("student", {
  id: uuid("id").primaryKey().default(sql`uuid_generate_v4()`),
  studentId: varchar("student_id", { length: 20 }).unique(),
  firstname: varchar("firstname", { length: 100 }),
  middleName: varchar("middle_name", { length: 100 }),
  lastname: varchar("lastname", { length: 100 }),
  suffix: varchar("suffix", { length: 10 }),
  gender: varchar("gender", { length: 10 }),
  contactNo: varchar("contact_no", { length: 15 }),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const studentGrades = pgTable("student_grades", {
  id: uuid("id").primaryKey().default("uuid_generate_v4()"),
  studentId: uuid("student_id").references(() => student.id),
  instructorId: uuid("instructor_id").references(() => instructor.id),
  classId: uuid("class_id").references(() => classTable.id),
  gradeId: uuid("grade_id").references(() => grades.id),
  finalGrade: numeric("final_grade", { precision: 5, scale: 2 }),
  numericalEquivalent: numeric("numerical_equivalent", { precision: 5, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const temporaryGrades = pgTable("temporary_grades", {
  id: uuid("id").primaryKey().default("uuid_generate_v4()"),
  student_id: uuid("student_id"),
  studentName: text("student_name"),
  academicYearId: text("academic_year_id"),
  courseSemesterId: text("course_semester_id"),
  semesterId: text("semester_id"),
  midtermGrade: numeric("midterm_grade", { precision: 5, scale: 2 }),
  tentativeFinalGrade: numeric("tentative_final_grade", { precision: 5, scale: 2 }),
  finalGrade: numeric("final_grade", { precision: 5, scale: 2 }),
  courseId: uuid("course_id"),
  sectionId: uuid("section_id"),
  remarks: text("remarks"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});


