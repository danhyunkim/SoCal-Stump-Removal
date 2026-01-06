"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Building2, Mail, Lock, User } from "lucide-react";
import { toast } from "sonner";
import { signUp, signIn, claimBusiness } from "@/app/actions/auth";
import { createClient } from "@/lib/supabase/client";

function ClaimPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const businessId = searchParams.get("business");

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Auth form states
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    checkUser();
    if (businessId) {
      loadBusiness(businessId);
    }
  }, [businessId]);

  async function checkUser() {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setCurrentUser(user);
    setIsLoading(false);
  }

  async function loadBusiness(id: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("businesses")
      .select("*")
      .eq("id", id)
      .single();

    if (!error && data) {
      setSelectedBusiness(data);
    }
  }

  async function handleSearch() {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    const supabase = createClient();

    const { data, error } = await supabase
      .from("businesses")
      .select("id, name, city, address, is_claimed")
      .or(`name.ilike.%${searchQuery}%,city.ilike.%${searchQuery}%`)
      .limit(10);

    if (error) {
      toast.error("Search failed", { description: error.message });
    } else {
      setSearchResults(data || []);
    }

    setIsSearching(false);
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await signUp(signUpData);

    if (result.success) {
      toast.success("Account created!", {
        description: "Please check your email to verify your account.",
      });
      setCurrentUser(result.user);
      setSignUpData({ email: "", password: "", fullName: "" });
    } else {
      toast.error("Sign up failed", { description: result.error });
    }

    setIsSubmitting(false);
  }

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await signIn(signInData);

    if (result.success) {
      toast.success("Signed in successfully!");
      setCurrentUser(result.user);
      setSignInData({ email: "", password: "" });
    } else {
      toast.error("Sign in failed", { description: result.error });
    }

    setIsSubmitting(false);
  }

  async function handleClaimBusiness() {
    if (!selectedBusiness || !currentUser) return;

    setIsSubmitting(true);

    const result = await claimBusiness({
      businessId: selectedBusiness.id,
      userId: currentUser.id,
    });

    if (result.success) {
      toast.success("Claim submitted!", { description: result.message });
      // Optionally redirect to dashboard or show success message
    } else {
      toast.error("Claim failed", { description: result.error });
    }

    setIsSubmitting(false);
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-br from-amber-50 via-stone-50 to-white py-12">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Claim Your Business</h1>
            <p className="text-lg text-gray-600">
              Take control of your business listing and start managing leads
            </p>
          </div>

        {/* Step 1: Search for business */}
        {!selectedBusiness && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Building2 className="h-5 w-5" />
                Step 1: Find Your Business
              </CardTitle>
              <CardDescription>
                Search for your business name
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    placeholder="Search for your business name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="text-primary placeholder:text-primary/70"
                  />
                </div>
                <Button onClick={handleSearch} disabled={isSearching} className="bg-accent hover:bg-accent/90">
                  <Search className="h-4 w-4 mr-2" />
                  {isSearching ? "Searching..." : "Search"}
                </Button>
              </div>

              {searchResults.length > 0 && (
                <div className="mt-6 space-y-2">
                  {searchResults.map((business) => (
                    <div
                      key={business.id}
                      className="p-4 border rounded-lg hover:border-primary cursor-pointer transition-colors"
                      onClick={() => setSelectedBusiness(business)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{business.name}</h3>
                          <p className="text-sm text-gray-600">
                            {business.address}, {business.city}
                          </p>
                        </div>
                        {business.is_claimed && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            Already Claimed
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Selected Business */}
        {selectedBusiness && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{selectedBusiness.name}</CardTitle>
                  <CardDescription>
                    {selectedBusiness.address}, {selectedBusiness.city}
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setSelectedBusiness(null)}>
                  Change
                </Button>
              </div>
            </CardHeader>
          </Card>
        )}

        {/* Step 2: Sign in or Sign up */}
        {selectedBusiness && !currentUser && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Step 2: Sign In or Create Account
              </CardTitle>
              <CardDescription>
                You need an account to claim your business
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signin">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Create Account</TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div>
                      <Label htmlFor="signin-email">Email</Label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="signin-email"
                          type="email"
                          placeholder="your@email.com"
                          className="pl-10"
                          value={signInData.email}
                          onChange={(e) =>
                            setSignInData({ ...signInData, email: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="signin-password">Password</Label>
                      <div className="relative mt-1">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="signin-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          value={signInData.password}
                          onChange={(e) =>
                            setSignInData({ ...signInData, password: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div>
                      <Label htmlFor="signup-name">Full Name</Label>
                      <div className="relative mt-1">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="John Doe"
                          className="pl-10"
                          value={signUpData.fullName}
                          onChange={(e) =>
                            setSignUpData({ ...signUpData, fullName: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="signup-email">Email</Label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="your@email.com"
                          className="pl-10"
                          value={signUpData.email}
                          onChange={(e) =>
                            setSignUpData({ ...signUpData, email: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative mt-1">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          value={signUpData.password}
                          onChange={(e) =>
                            setSignUpData({ ...signUpData, password: e.target.value })
                          }
                          required
                          minLength={6}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Minimum 8 characters
                      </p>
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Claim Business */}
        {selectedBusiness && currentUser && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Step 3: Verify Ownership
              </CardTitle>
              <CardDescription>
                We'll send a verification email to confirm you own this business
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-900">
                  A verification email will be sent to the business email address you signed up with. Please
                  make sure you have access to this email.
                </p>
              </div>

              <Button
                onClick={handleClaimBusiness}
                className="w-full"
                size="lg"
                disabled={isSubmitting || selectedBusiness.is_claimed}
              >
                {isSubmitting ? "Sending verification..." : "Claim This Business"}
              </Button>

              {selectedBusiness.is_claimed && (
                <p className="text-sm text-red-600 mt-2 text-center">
                  This business has already been claimed
                </p>
              )}
            </CardContent>
          </Card>
        )}
        </div>
      </div>
    </div>
  );
}

export default function ClaimPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <p>Loading...</p>
        </div>
      </div>
    }>
      <ClaimPageContent />
    </Suspense>
  );
}
