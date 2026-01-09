import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Star, TrendingUp, Building2, Calendar } from "lucide-react";
import Link from "next/link";
import type { Business, FormSubmission } from "@/lib/supabase/types";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const supabase = await createClient();

  // Get user's business
  const { data: business } = await supabase
    .from("businesses")
    .select("*")
    .eq("owner_id", user.id)
    .single<Business>();

  // Get recent form submissions
  const { data: recentLeads } = await supabase
    .from("form_submissions")
    .select("*")
    .eq("business_id", business?.id || "")
    .order("created_at", { ascending: false })
    .limit(5)
    .returns<FormSubmission[]>();

  // Get stats
  const { count: totalLeads } = await supabase
    .from("form_submissions")
    .select("*", { count: "exact", head: true })
    .eq("business_id", business?.id || "");

  const { count: quoteRequests } = await supabase
    .from("form_submissions")
    .select("*", { count: "exact", head: true })
    .eq("business_id", business?.id || "")
    .eq("form_type", "quote");

  const { count: contactMessages } = await supabase
    .from("form_submissions")
    .select("*", { count: "exact", head: true })
    .eq("business_id", business?.id || "")
    .eq("form_type", "contact");

  if (!business) {
    return (
      <div className="text-center py-12">
        <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Business Found</h2>
        <p className="text-gray-600 mb-6">
          You haven't claimed a business yet.
        </p>
        <Link href="/claim">
          <Button>Claim Your Business</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
        <p className="text-gray-600 mt-1">
          Here's what's happening with {business.name}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Mail className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads || 0}</div>
            <p className="text-xs text-gray-500 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Quote Requests</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quoteRequests || 0}</div>
            <p className="text-xs text-gray-500 mt-1">Ready for pricing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Contact Messages</CardTitle>
            <Phone className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contactMessages || 0}</div>
            <p className="text-xs text-gray-500 mt-1">General inquiries</p>
          </CardContent>
        </Card>
      </div>

      {/* Business Info Card */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{business.name}</CardTitle>
              <CardDescription>{business.city}, CA</CardDescription>
            </div>
            <Link href="/dashboard/business">
              <Button variant="outline" size="sm">
                Edit Business
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Rating</p>
              <div className="flex items-center gap-2 mt-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">
                  {business.rating !== null ? business.rating.toFixed(1) : "N/A"}
                </span>
                <span className="text-sm text-gray-500">
                  ({business.review_count} reviews)
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <div className="mt-1">
                <Badge variant={business.is_claimed ? "default" : "secondary"}>
                  {business.is_claimed ? "Claimed" : "Unclaimed"}
                </Badge>
                {business.is_featured && (
                  <Badge className="ml-2 bg-accent">Featured</Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Leads */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Recent Leads</CardTitle>
              <CardDescription>Latest customer inquiries</CardDescription>
            </div>
            <Link href="/dashboard/leads">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {!recentLeads || recentLeads.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Mail className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p>No leads yet</p>
              <p className="text-sm mt-1">
                Share your business listing to start receiving inquiries
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-start justify-between border-b pb-4 last:border-0"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">{lead.name}</p>
                      <Badge
                        variant={lead.form_type === "quote" ? "default" : "secondary"}
                      >
                        {lead.form_type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{lead.email}</p>
                    {lead.phone && (
                      <p className="text-sm text-gray-600">{lead.phone}</p>
                    )}
                    {lead.message && (
                      <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                        {lead.message}
                      </p>
                    )}
                  </div>
                  <div className="text-right ml-4">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      {new Date(lead.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
