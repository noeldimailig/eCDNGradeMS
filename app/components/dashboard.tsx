"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {SignOutButton} from "@/app/components/auth/sign-out";

export const DashboardPage = () => {
  const [isAccountLinked, setIsAccountLinked] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
//   const { update } = useSession();

//   useEffect(() => {
//     const userInfo = async () => {
//       const name = await getUserName();
//       if (name) {
//         setUsername(name);
//       }

//       const role = await getUserRole();
//       if (role) {
//         setRole(role);
//       }
//     };
//     const accountLinkStatus = async () => {
//       try {
//         const accountLinkStatus = await getAccountLinkStatus();
//         setIsAccountLinked(accountLinkStatus);
//       } catch (error) {
//         console.error("Failed to get account link status:", error);
//       }
//     };
//     userInfo();
//     accountLinkStatus();
//   }, []);

  return (
    <div className="dashboard-page">
      <h2>Dashboard</h2>
      <SignOutButton className="px-4 py-2 bg-red-500 text-white rounded"/>
    </div>
  );
};