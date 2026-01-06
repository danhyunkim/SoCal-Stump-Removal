"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, Calendar, Loader2, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Business } from "@/lib/supabase/types";

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "quote" | "contact">("all");

  useEffect(() => {
    loadLeads();
  }, []);

  async function loadLeads() {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    // Get user's business
    const { data: business } = await supabase
      .from("businesses")
      .select("*")
      .eq("owner_id", user.id)
      .single<Business>();

    if (!business) {
      setIsLoading(false);
      return;
    }

    // Get all leads for this business
    const { data, error } = await supabase
      .from("form_submissions")
      .select("*")
      .eq("business_id", business.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading leads:", error);
    } else {
      setLeads(data || []);
    }

    setIsLoading(false);
  }

  const filteredLeads = leads.filter((lead) => {
    if (filter === "all") return true;
    return lead.form_type === filter;
  });

  const quoteCount = leads.filter((l) => l.form_type === "quote").length;
  const contactCount = leads.filter((l) => l.form_type === "contact").length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
        <p className="text-gray-600 mt-1">Manage customer inquiries and quote requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leads.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Quote Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quoteCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Contact Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contactCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Leads List */}
      <Card>
        <CardHeader>
          <CardTitle>All Leads</CardTitle>
          <CardDescription>View and manage customer inquiries</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={filter} onValueChange={(v: any) => setFilter(v)}>
            <TabsList>
              <TabsTrigger value="all">
                All ({leads.length})
              </TabsTrigger>
              <TabsTrigger value="quote">
                Quotes ({quoteCount})
              </TabsTrigger>
              <TabsTrigger value="contact">
                Contact ({contactCount})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={filter} className="mt-6">
              {filteredLeads.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Mail className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>No leads found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="border rounded-lg p-6 hover:border-primary transition-colors"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{lead.name}</h3>
                            <Badge
                              variant={lead.form_type === "quote" ? "default" : "secondary"}
                            >
                              {lead.form_type}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            {new Date(lead.created_at).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <a
                            href={`mailto:${lead.email}`}
                            className="text-primary hover:underline"
                          >
                            {lead.email}
                          </a>
                        </div>
                        {lead.phone && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <a
                              href={`tel:${lead.phone}`}
                              className="text-primary hover:underline"
                            >
                              {lead.phone}
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Lead Details */}
                      <div className="space-y-3">
                        {lead.service_type && (
                          <div>
                            <span className="text-sm font-medium text-gray-700">
                              Service Type:
                            </span>{" "}
                            <span className="text-sm text-gray-600">
                              {lead.service_type}
                            </span>
                          </div>
                        )}

                        {lead.form_type === "quote" && (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {lead.property_size && (
                              <div>
                                <span className="text-sm font-medium text-gray-700">
                                  Property Size:
                                </span>{" "}
                                <span className="text-sm text-gray-600">
                                  {lead.property_size}
                                </span>
                              </div>
                            )}
                            {lead.stump_count && (
                              <div>
                                <span className="text-sm font-medium text-gray-700">
                                  Stump Count:
                                </span>{" "}
                                <span className="text-sm text-gray-600">
                                  {lead.stump_count}
                                </span>
                              </div>
                            )}
                            {lead.urgency && (
                              <div>
                                <span className="text-sm font-medium text-gray-700">
                                  Urgency:
                                </span>{" "}
                                <Badge
                                  variant={
                                    lead.urgency === "urgent" ? "destructive" : "secondary"
                                  }
                                >
                                  {lead.urgency}
                                </Badge>
                              </div>
                            )}
                          </div>
                        )}

                        {lead.message && (
                          <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm font-medium text-gray-700 mb-1">Message:</p>
                            <p className="text-sm text-gray-700 whitespace-pre-wrap">
                              {lead.message}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 mt-4 pt-4 border-t">
                        <a href={`mailto:${lead.email}`}>
                          <Button size="sm">
                            <Mail className="h-4 w-4 mr-2" />
                            Reply via Email
                          </Button>
                        </a>
                        {lead.phone && (
                          <a href={`tel:${lead.phone}`}>
                            <Button variant="outline" size="sm">
                              <Phone className="h-4 w-4 mr-2" />
                              Call
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
