import { ResetPasswordForm } from "@/app/components/auth/reset-password-form"
import { AuthLayout } from "@/app/components/auth/auth-layout"

export default function ResetPasswordPage() {
  return (
    <AuthLayout title="Reset password" description="Enter your new password below.">
      <ResetPasswordForm />
    </AuthLayout>
  )
}

