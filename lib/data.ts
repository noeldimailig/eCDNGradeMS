"use server";
import { db } from "@/db"
import { section } from "@/db/schema"

export const getSections = async () => {
  try {
    const result = await db.select({ id: section.id, name: section.name }).from(section);
    console.log("Sections:", result);
    return result;
  } catch (error) {
    console.error("Failed to get sections:", error);
    throw error;
  }
};