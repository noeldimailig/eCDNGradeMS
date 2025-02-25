"use server";

import { signOut } from "@/lib/auth/auth";

export const handleSignOut = async () => {
  try {
    await signOut();
  } catch (error) {
    throw error;
  }
};