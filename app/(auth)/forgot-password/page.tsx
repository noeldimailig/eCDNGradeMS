import { ForgotPasswordForm } from "@/app/components/auth/forgot-password-form"
import { AuthLayout } from "@/app/components/auth/auth-layout"

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Forgot password"
      description="Enter your email address and we'll send you a link to reset your password."
    >
      <ForgotPasswordForm />
    </AuthLayout>
  )
}

