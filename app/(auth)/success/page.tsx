import { AuthSuccess } from "@/app/components/auth/auth-success"
import { AuthLayout } from "@/app/components/auth/auth-layout"

export default function VerifyPage() {
  return (
    <AuthLayout 
      title="Please verify your email" 
      description="You're almost there!">
      <AuthSuccess />
    </AuthLayout>
  )
}
