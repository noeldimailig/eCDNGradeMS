import { redirect } from "next/navigation";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";
import { getUserRole } from "@/lib/auth/getUserRoleServerAction";

export default async function Home() {
  const isAuthenticated = await checkIsAuthenticated();

  if (!isAuthenticated) {
    return redirect("/sign-in");
  }

  let userRole;
  try {
    userRole = await getUserRole(); // Fetch role dynamically
  } catch (error) {
    console.error("Failed to get user role:", error);
    return redirect("/sign-in"); // Redirect if an error occurs
  }

  if (userRole === "Student") {
    redirect("/student/dashboard");
  } else if (userRole === "Instructor") {
    redirect("/instructor/dashboard");
  } else if (userRole === "Admin") {
    redirect("/admin/dashboard");
  }
}
