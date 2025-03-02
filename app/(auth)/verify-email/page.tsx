import VerifyForm from "@/app/components/auth/verify-form"
import { AuthLayout } from "@/app/components/auth/auth-layout"

export default function VerifyPage() {
  return (
    <AuthLayout title="Verify your email" description="We've sent you a verification code. Please enter it below.">
      <VerifyForm />
    </AuthLayout>
  )
}

