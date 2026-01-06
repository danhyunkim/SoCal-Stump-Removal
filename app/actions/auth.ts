"use server";

import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";
import { ClaimVerificationEmail } from "@/lib/email/templates";
import { generateVerificationToken } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { Business, BusinessClaim } from "@/lib/supabase/types";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SignUpData {
  email: string;
  password: string;
  fullName: string;
}

interface SignInData {
  email: string;
  password: string;
}

interface ClaimBusinessData {
  businessId: string;
  userId: string;
}

export async function signUp(data: SignUpData) {
  try {
    const supabase = await createClient();

    // Sign up the user with Supabase Auth
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
        },
      },
    });

    if (signUpError) {
      return {
        success: false,
        error: signUpError.message,
      };
    }

    if (!authData.user) {
      return {
        success: false,
        error: "Failed to create user",
      };
    }

    return {
      success: true,
      user: authData.user,
    };
  } catch (error) {
    console.error("Error in signUp:", error);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}

export async function signIn(data: SignInData) {
  try {
    const supabase = await createClient();

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      user: authData.user,
    };
  } catch (error) {
    console.error("Error in signIn:", error);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function claimBusiness(data: ClaimBusinessData) {
  try {
    const supabase = await createClient();

    // Get business details
    const { data: business, error: businessError } = await supabase
      .from("businesses")
      .select("*")
      .eq("id", data.businessId)
      .single<Business>();

    if (businessError || !business) {
      return {
        success: false,
        error: "Business not found",
      };
    }

    if (business.is_claimed) {
      return {
        success: false,
        error: "This business has already been claimed",
      };
    }

    if (!business.email) {
      return {
        success: false,
        error: "This business does not have an email address on file. Please contact support.",
      };
    }

    // Get user details from auth
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user || user.id !== data.userId) {
      return {
        success: false,
        error: "User not found",
      };
    }

    const fullName = user.user_metadata?.full_name || user.email;

    // Check if there's already a pending claim
    const { data: existingClaim } = await supabase
      .from("business_claims")
      .select("id, status")
      .eq("business_id", data.businessId)
      .eq("user_id", data.userId)
      .maybeSingle<BusinessClaim>();

    if (existingClaim && existingClaim.status === "pending") {
      return {
        success: false,
        error: "You already have a pending claim for this business",
      };
    }

    if (existingClaim && existingClaim.status === "approved") {
      return {
        success: false,
        error: "You have already claimed this business",
      };
    }

    // Generate verification token
    const verificationToken = generateVerificationToken();

    // Create business claim
    // @ts-ignore - Supabase type inference issue with RLS
    const { error: claimError } = await supabase.from("business_claims").insert({
      business_id: data.businessId,
      user_id: data.userId,
      status: "pending",
      verification_token: verificationToken,
    });

    if (claimError) {
      console.error("Error creating claim:", claimError);
      return {
        success: false,
        error: "Failed to create claim",
      };
    }

    // Send verification email to business email
    const verificationUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/claim/verify?token=${verificationToken}`;

    try {
      await resend.emails.send({
        from: "SoCal Stump Removal <noreply@yourdomain.com>", // Update with your verified domain
        to: business.email,
        subject: `Verify Your Business Claim - ${business.name}`,
        react: ClaimVerificationEmail({
          businessName: business.name,
          verificationUrl,
          ownerName: fullName,
        }),
      });
    } catch (emailError) {
      console.error("Error sending verification email:", emailError);
      return {
        success: false,
        error: "Failed to send verification email",
      };
    }

    return {
      success: true,
      message: `A verification email has been sent to ${business.email}. Please check your inbox and click the verification link.`,
    };
  } catch (error) {
    console.error("Error in claimBusiness:", error);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}

export async function verifyBusinessClaim(token: string) {
  try {
    const supabase = await createClient();

    // Find the claim by token
    const { data: claim, error: claimError } = await supabase
      .from("business_claims")
      .select("*, businesses(*)")
      .eq("verification_token", token)
      .eq("status", "pending")
      .single() as any;

    if (claimError || !claim) {
      return {
        success: false,
        error: "Invalid or expired verification link",
      };
    }

    // Check if token is expired (24 hours)
    const createdAt = new Date(claim.created_at);
    const now = new Date();
    const hoursDiff = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);

    if (hoursDiff > 24) {
      return {
        success: false,
        error: "Verification link has expired",
      };
    }

    // Update claim status
    const { error: updateClaimError } = await supabase
      .from("business_claims")
      // @ts-ignore - Supabase type inference issue with RLS
      .update({
        status: "approved",
        verified_at: new Date().toISOString(),
      })
      .eq("id", claim.id);

    if (updateClaimError) {
      console.error("Error updating claim:", updateClaimError);
      return {
        success: false,
        error: "Failed to verify claim",
      };
    }

    // Update business to mark as claimed and set owner
    const { error: updateBusinessError } = await supabase
      .from("businesses")
      // @ts-ignore - Supabase type inference issue with RLS
      .update({
        is_claimed: true,
        owner_id: claim.user_id,
      })
      .eq("id", claim.business_id);

    if (updateBusinessError) {
      console.error("Error updating business:", updateBusinessError);
      return {
        success: false,
        error: "Failed to update business",
      };
    }

    return {
      success: true,
      businessName: claim.businesses.name,
    };
  } catch (error) {
    console.error("Error in verifyBusinessClaim:", error);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}
