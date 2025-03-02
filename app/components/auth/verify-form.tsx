"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icons } from "@/app/components/ui/icons";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { verifyEmail } from "@/lib/auth/verify-email";

export default function VerifyForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      return;
    }

    async function verify() {
      try {
        const response = await verifyEmail(token as string); // Pass the token
        if (!response.success) {
          throw new Error(response.error || "Verification failed");
        }

        setStatus("success");
        router.replace("/sign-in"); // Redirect immediately
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");
      }
    }

    verify();
  }, [searchParams, router]);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      {status === "loading" && (
        <>
          <Icons.spinner className="h-6 w-6 animate-spin mb-4 text-blue-500" />
          <p>Verifying your email...</p>
        </>
      )}

      {status === "success" && (
        <Alert className="bg-green-100 text-green-700 p-4 rounded-lg">
          <AlertDescription>Your email has been verified! Redirecting...</AlertDescription>
        </Alert>
      )}

      {status === "error" && (
        <>
          <Alert variant="destructive">
            <AlertDescription>Invalid or expired token.</AlertDescription>
          </Alert>
          <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => router.push("/sign-up")}>
            Register Again
          </Button>
        </>
      )}
    </div>
  );
}
