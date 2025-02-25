"use server";

import { auth } from "@/lib/auth/auth";

export const getUserName = async () => {
  const session = await auth();
  if (session) {
    return session.user?.name;
  }
};