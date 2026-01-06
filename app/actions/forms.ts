"use server";

import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";
import { ContactEmail, QuoteEmail } from "@/lib/email/templates";
import type { Business } from "@/lib/supabase/types";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  businessId: string;
  businessName: string;
  name: string;
  email: string;
  phone?: string;
  serviceType: string;
  message: string;
}

interface QuoteFormData {
  businessId: string;
  businessName: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  propertySize: string;
  stumpCount: string;
  urgency: string;
  message?: string;
}

export async function submitContactForm(data: ContactFormData) {
  try {
    const supabase = await createClient();

    // Get business email
    const { data: business, error: businessError } = await supabase
      .from("businesses")
      .select("*")
      .eq("id", data.businessId)
      .single<Business>();

    if (businessError || !business?.email) {
      return {
        success: false,
        error: "Business not found or no email configured",
      };
    }

    // Save to database
    const { error: insertError } = await supabase
      .from("form_submissions")
      // @ts-ignore - Supabase type inference issue with RLS
      .insert({
        business_id: data.businessId,
        form_type: "contact",
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        service_type: data.serviceType,
        message: data.message,
      });

    if (insertError) {
      console.error("Error saving contact form:", insertError);
      return {
        success: false,
        error: "Failed to save contact form",
      };
    }

    // Send email to business owner
    try {
      await resend.emails.send({
        from: "SoCal Stump Removal <noreply@yourdomain.com>", // Update with your verified domain
        to: business.email,
        replyTo: data.email,
        subject: `New Contact Form from ${data.name}`,
        react: ContactEmail({
          businessName: business.name,
          name: data.name,
          email: data.email,
          phone: data.phone,
          serviceType: data.serviceType,
          message: data.message,
        }),
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      // Don't fail the request if email fails
    }

    return { success: true };
  } catch (error) {
    console.error("Error in submitContactForm:", error);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}

export async function submitQuoteForm(data: QuoteFormData) {
  try {
    const supabase = await createClient();

    // Get business email
    const { data: business, error: businessError } = await supabase
      .from("businesses")
      .select("*")
      .eq("id", data.businessId)
      .single<Business>();

    if (businessError || !business?.email) {
      return {
        success: false,
        error: "Business not found or no email configured",
      };
    }

    // Save to database
    const { error: insertError } = await supabase
      .from("form_submissions")
      // @ts-ignore - Supabase type inference issue with RLS
      .insert({
        business_id: data.businessId,
        form_type: "quote",
        name: data.name,
        email: data.email,
        phone: data.phone,
        service_type: data.serviceType,
        property_size: data.propertySize,
        stump_count: data.stumpCount,
        urgency: data.urgency,
        message: data.message || null,
      });

    if (insertError) {
      console.error("Error saving quote form:", insertError);
      return {
        success: false,
        error: "Failed to save quote request",
      };
    }

    // Send email to business owner
    try {
      await resend.emails.send({
        from: "SoCal Stump Removal <noreply@yourdomain.com>", // Update with your verified domain
        to: business.email,
        replyTo: data.email,
        subject: `New Quote Request from ${data.name}`,
        react: QuoteEmail({
          businessName: business.name,
          name: data.name,
          email: data.email,
          phone: data.phone,
          serviceType: data.serviceType,
          propertySize: data.propertySize,
          stumpCount: data.stumpCount,
          urgency: data.urgency,
          message: data.message,
        }),
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      // Don't fail the request if email fails
    }

    return { success: true };
  } catch (error) {
    console.error("Error in submitQuoteForm:", error);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}
