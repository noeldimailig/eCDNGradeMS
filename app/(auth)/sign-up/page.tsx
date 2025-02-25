import { SignUpForm } from "@/app/components/auth/signup-form"
import { AuthLayout } from "@/app/components/auth/auth-layout"

export default function SignUpPage() {
  return (
    <AuthLayout title="Create an account" description="Enter your email below to create your account">
      <SignUpForm />
    </AuthLayout>
  )
}

