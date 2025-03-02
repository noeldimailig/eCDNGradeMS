"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/app/components/ui/icons"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const form = event.target as HTMLFormElement
    const password = form.password.value
    const confirmPassword = form.confirmPassword.value

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      // Here you would typically call your reset password API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/auth/login")
    } catch (error) {
      setError(`An error occurred. Please try again. ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">
          New Password
        </Label>
        <Input
          id="password"
          required
          type="password"
          placeholder="********"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">
          Confirm New Password
        </Label>
        <Input
          id="confirmPassword"
          required
          type="password"
          placeholder="********"
        />
      </div>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" type="submit" disabled={isLoading}>
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Reset Password
      </Button>
    </form>
  )
}