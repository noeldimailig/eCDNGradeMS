"use client"

import { Icons } from "@/app/components/ui/icons"
import Link from "next/link";

export function AuthSuccess() {

  return (
    <div className="space-y-4 text-center">
      <div className="flex flex-col items-center justify-center bg-green-100 text-green-600 p-4 rounded-lg">
        <Icons.mail className="h-10 w-10" />
        <p className="text-gray-700">Your account has been successfully created. A verification email has been sent to your email address. Please check your inbox and follow the instructions to verify your account.</p>
      </div>
      
      <div className="mt-4 text-center">
        <span className="text-sm text-gray-500">
            Didn&apos;t recieve an email? To go back to the sign-up page and try agin, 
          <Link href="/sign-up" className="text-blue-600 hover:underline">
             Click here
          </Link>
        </span>
      </div>
    </div>
  )
}
