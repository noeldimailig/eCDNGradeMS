"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, User, Book, FileText, Settings, LogOutIcon } from "lucide-react";
import { handleSignOut } from "@/lib/auth/sign-out";

const role = "student"; // Example role

const menuItems = [
  {
    title: "MENU",
    items: [
      { 
        icon: <Home size={20} />, 
        label: "Dashboard", 
        href: role === "student" ? "/dashboard/student/dashboard" : "/dashboard", 
        visible: ["admin", "teacher", "student"] 
      },
      { icon: <Users size={20} />, label: "Teachers", href: "/personal-information", visible: ["admin", "teacher"] },
      { icon: <User size={20} />, label: "Students", href: "/list/students", visible: ["admin", "teacher"] },
      { icon: <Book size={20} />, label: "Subjects", href: "/list/subjects", visible: ["admin"] },
      { icon: <User size={20} />, label: "Personal Information", href: "/student/personal-information", visible: ["teacher", "student"] },
      { icon: <FileText size={20} />, label: "Grades", href: "/student/grades", visible: ["student"] },
      { icon: <Settings size={20} />, label: "Account Settings", href: "/student/account-settings", visible: ["admin", "teacher", "student"] },
      { icon: <LogOutIcon size={20} />, label: "Logout", href: "/sign-out", visible: ["admin", "teacher", "student"], action: "logout" },
    ],
  },
];

const Menu = () => {
  const pathname = usePathname(); // Get current route
  console.log("Current pathname:", pathname); // Debugging

  const handleLogout = async (event: React.MouseEvent) => {
    event.preventDefault();
    try {
      await handleSignOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

              return item.action === "logout" ? (
                <button
                  key={item.label}
                  onClick={handleLogout}
                  className={`flex items-center justify-center lg:justify-start gap-4 py-2 md:px-2 rounded-md w-full text-left ${
                    isActive ? "bg-blue-100 text-blue-500 font-semibold" : "text-gray-500 hover:bg-blue-100 hover:text-blue-500"
                  }`}
                >
                  {item.icon}
                  <span className="hidden lg:block">{item.label}</span>
                </button>
              ) : (
                <Link
                  href={item.href}
                  key={item.label}
                  className={`flex items-center justify-center lg:justify-start gap-4 py-2 md:px-2 rounded-md ${
                    isActive ? "bg-blue-100 text-blue-500 font-semibold" : "text-gray-500 hover:bg-blue-100 hover:text-blue-500"
                  }`}
                >
                  {item.icon}
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
