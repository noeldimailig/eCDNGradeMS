import Sidebar from "@/app/components/sidebar"; // Your sidebar component
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";
import { redirect } from "next/navigation";
import { getUserRole } from "@/lib/auth/getUserRoleServerAction";
import { Toaster } from "@/components/ui/sonner"; // Using ShadCN toast

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = await checkIsAuthenticated();
  if (!isAuthenticated) {
    redirect("/auth/sign-in");
  }

  const userRole = await getUserRole();// Get user role

  return (
    
    <div className="flex">
      <Sidebar role={userRole as string} /> {/* Sidebar adapts based on user role */}
      <main className="flex-1 p-4">{children}</main>
      <Toaster/>
    </div>
  );
}
