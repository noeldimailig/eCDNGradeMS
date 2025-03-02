"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/app/components/ui/icons"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  // const router = useRouter()

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess(false)

    // const form = event.target as HTMLFormElement
    // const email = form.email.value

    try {
      // Here you would typically call your forgot password API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccess(true)
    } catch (error) {
      setError(`An error occurred. Please try again. ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">
          Email
        </Label>
        <Input
          id="email"
          placeholder="m@example.com"
          required
          type="email"
        />
      </div>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert className="bg-blue-50 border-blue-200 text-blue-800">
          <AlertDescription>
            If an account exists for that email, we have sent password reset instructions.
          </AlertDescription>
        </Alert>
      )}
      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" type="submit" disabled={isLoading}>
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Send Reset Instructions
      </Button>
    </form>
  )
}