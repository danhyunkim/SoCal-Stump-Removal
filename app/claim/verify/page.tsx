"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { verifyBusinessClaim } from "@/app/actions/auth";

function VerifyClaimPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const [businessName, setBusinessName] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No verification token provided");
      return;
    }

    verifyToken();
  }, [token]);

  async function verifyToken() {
    if (!token) return;

    const result = await verifyBusinessClaim(token);

    if (result.success) {
      setStatus("success");
      setBusinessName(result.businessName || "");
      setMessage("Your business claim has been verified successfully!");
    } else {
      setStatus("error");
      setMessage(result.error || "Verification failed");
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex flex-col items-center text-center">
              {status === "loading" && (
                <>
                  <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
                  <CardTitle>Verifying Your Business</CardTitle>
                  <CardDescription>Please wait while we verify your business...</CardDescription>
                </>
              )}

              {status === "success" && (
                <>
                  <CheckCircle2 className="h-16 w-16 text-green-600 mb-4" />
                  <CardTitle className="text-green-900">Verification Successful!</CardTitle>
                  <CardDescription className="mt-2">{message}</CardDescription>
                </>
              )}

              {status === "error" && (
                <>
                  <XCircle className="h-16 w-16 text-red-600 mb-4" />
                  <CardTitle className="text-red-900">Verification Failed</CardTitle>
                  <CardDescription className="mt-2 text-red-600">{message}</CardDescription>
                </>
              )}
            </div>
          </CardHeader>

          {status !== "loading" && (
            <CardContent className="space-y-4">
              {status === "success" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">What's Next?</h3>
                  <ul className="text-sm text-green-800 space-y-2">
                    <li>• You now have full control of your business listing</li>
                    <li>• Access your dashboard to manage your business information</li>
                    <li>• View and respond to customer inquiries</li>
                    <li>• Update your business hours, photos, and details</li>
                  </ul>
                </div>
              )}

              {status === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-900 mb-2">Common Issues:</h3>
                  <ul className="text-sm text-red-800 space-y-2">
                    <li>• Verification links expire after 24 hours</li>
                    <li>• The link can only be used once</li>
                    <li>• The business may have already been claimed</li>
                  </ul>
                </div>
              )}

              <div className="flex gap-3 justify-center pt-4">
                {status === "success" && (
                  <>
                    <Button onClick={() => router.push("/dashboard")} size="lg">
                      Go to Dashboard
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => router.push("/")}
                      size="lg"
                    >
                      Back to Home
                    </Button>
                  </>
                )}

                {status === "error" && (
                  <>
                    <Button onClick={() => router.push("/claim")} size="lg">
                      Try Again
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => router.push("/")}
                      size="lg"
                    >
                      Back to Home
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}

export default function VerifyClaimPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center text-center">
                <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
                <CardTitle>Loading...</CardTitle>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    }>
      <VerifyClaimPageContent />
    </Suspense>
  );
}
