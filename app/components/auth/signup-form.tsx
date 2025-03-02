"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { registerUser } from "@/lib/auth/registerUser";

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const form = event.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    const result = await registerUser(email, password);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
      return;
    }

    router.push("/success");
  }

  return (
    <div className="space-y-2">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-blue-800">
            Email
          </Label>
          <Input id="email" required type="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-blue-800">
            Password
          </Label>
          <Input id="password" required type="password" />
        </div>
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Button className="w-full bg-blue-700 hover:bg-blue-600" type="submit" disabled={isLoading}>
          {isLoading ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>
      <div className="mt-4 text-center">
        <span className="text-sm text-gray-500">
          Already have an account?
          <Link href="/sign-in" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </span>
      </div>
    </div>
  );
}
