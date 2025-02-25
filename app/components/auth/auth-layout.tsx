import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import logo from '@/public/images/CDNLogo.png'
import Image from 'next/image'

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  description: string
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-4">
      <div className="mb-4 flex flex-col items-center">
        <Image
            src={logo}
            width={100}
            height={100}
            alt="e-CDNGradeMS Logo"
            className="w-50 h-50 object-cover rounded-full"
          />
        <h1 className="text-2xl font-semibold text-blue-800">e-CDNGradeMS</h1>
      </div>

      <Card className="w-full max-w-sm bg-white border-blue-200">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
          <CardDescription className="text-center">{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  )
}

