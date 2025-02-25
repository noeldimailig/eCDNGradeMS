import { LoginForm } from "@/app/components/auth/signin-form"
import { AuthLayout } from "@/app/components/auth/auth-layout"
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";
import { redirect } from "next/navigation";
import { getUserRole } from "@/lib/auth/getUserRoleServerAction";

export default async function LoginPage() {
  const isAuthenticated = await checkIsAuthenticated();
   // Simulated user role retrieval

  if (isAuthenticated) {
    const userRole = await getUserRole();
    
    if (userRole === "Instructor") {
      redirect("/instructor/dashboard");
    } else if (userRole === "Student") {
      redirect("/student/dashboard");
    } else if (userRole === "Admin") {
      redirect("/admin/dashboard");
    }
  }

  return (
    <AuthLayout title="Welcome back" description="Choose your preferred sign in method">
      <LoginForm />
    </AuthLayout>
  )
}

