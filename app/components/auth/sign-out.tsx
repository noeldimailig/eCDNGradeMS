"use client";

import { handleSignOut } from "@/lib/auth/sign-out";

export const SignOutButton = (props: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <button
      className={props.className}
      style={{ cursor: "pointer" }}
      onClick={() => handleSignOut()}
    >
      {props.children || "Sign Out"}
    </button>
  );
};