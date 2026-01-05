"use server";

import { createClient } from "./server";
import { Database } from "./types";
import { revalidatePath } from "next/cache";

type FormSubmissionInsert =
  Database["public"]["Tables"]["form_submissions"]["Insert"];
type BusinessUpdate = Database["public"]["Tables"]["businesses"]["Update"];
type ReviewInsert = Database["public"]["Tables"]["reviews"]["Insert"];

export async function createFormSubmission(data: FormSubmissionInsert) {
  const supabase = await createClient();

  const { data: submission, error } = await supabase
    .from("form_submissions")
    // @ts-ignore - Supabase type inference issue
    .insert(data)
    .select()
    .single();

  if (error) {
    console.error("Error creating form submission:", error);
    return { error: error.message, data: null };
  }

  return { error: null, data: submission };
}

export async function createBusinessClaim(
  businessId: string,
  userId: string,
  verificationToken: string
) {
  const supabase = await createClient();

  const { data: claim, error } = await supabase
    .from("business_claims")
    // @ts-ignore - Supabase type inference issue
    .insert({
      business_id: businessId,
      user_id: userId,
      status: "pending",
      verification_token: verificationToken,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating business claim:", error);
    return { error: error.message, data: null };
  }

  return { error: null, data: claim };
}

export async function verifyBusinessClaim(token: string) {
  const supabase = await createClient();

  // Find the claim with this token
  const { data: claim, error: fetchError } = await supabase
    .from("business_claims")
    .select("*")
    .eq("verification_token", token)
    .eq("status", "pending")
    .single();

  if (fetchError || !claim) {
    return { error: "Invalid or expired verification token", data: null };
  }

  // Update claim to verified
  const { data: updatedClaim, error: updateError } = await (supabase as any)
    .from("business_claims")
    .update({
      verified_at: new Date().toISOString(),
    })
    .eq("id", (claim as any).id)
    .select()
    .single();

  if (updateError) {
    console.error("Error verifying claim:", updateError);
    return { error: updateError.message, data: null };
  }

  return { error: null, data: updatedClaim };
}

export async function updateBusiness(businessId: string, updates: BusinessUpdate) {
  const supabase = await createClient();

  const { data: business, error } = await (supabase as any)
    .from("businesses")
    .update(updates)
    .eq("id", businessId)
    .select()
    .single();

  if (error) {
    console.error("Error updating business:", error);
    return { error: error.message, data: null };
  }

  // Revalidate the business page
  if (business.slug) {
    revalidatePath(`/businesses/${business.slug}`);
  }

  return { error: null, data: business };
}

export async function uploadBusinessPhoto(
  businessId: string,
  file: File,
  altText?: string
) {
  const supabase = await createClient();

  // Generate unique filename
  const fileExt = file.name.split(".").pop();
  const fileName = `${businessId}/${Date.now()}.${fileExt}`;

  // Upload to storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("business-photos")
    .upload(fileName, file);

  if (uploadError) {
    console.error("Error uploading photo:", uploadError);
    return { error: uploadError.message, data: null };
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("business-photos").getPublicUrl(fileName);

  // Save photo record to database
  const { data: photo, error: dbError } = await supabase
    .from("photos")
    // @ts-ignore - Supabase type inference issue
    .insert({
      business_id: businessId,
      url: publicUrl,
      alt_text: altText || null,
      is_primary: false,
    })
    .select()
    .single();

  if (dbError) {
    console.error("Error saving photo record:", dbError);
    return { error: dbError.message, data: null };
  }

  return { error: null, data: photo };
}

export async function deleteBusinessPhoto(photoId: string, photoUrl: string) {
  const supabase = await createClient();

  // Extract file path from URL
  const urlParts = photoUrl.split("/business-photos/");
  if (urlParts.length !== 2) {
    return { error: "Invalid photo URL", data: null };
  }
  const filePath = urlParts[1];

  // Delete from storage
  const { error: storageError } = await supabase.storage
    .from("business-photos")
    .remove([filePath]);

  if (storageError) {
    console.error("Error deleting photo from storage:", storageError);
  }

  // Delete from database
  const { error: dbError } = await supabase
    .from("photos")
    .delete()
    .eq("id", photoId);

  if (dbError) {
    console.error("Error deleting photo record:", dbError);
    return { error: dbError.message, data: null };
  }

  return { error: null, data: true };
}

export async function createReview(review: ReviewInsert) {
  const supabase = await createClient();

  const { data: newReview, error } = await supabase
    .from("reviews")
    // @ts-ignore - Supabase type inference issue
    .insert(review)
    .select()
    .single();

  if (error) {
    console.error("Error creating review:", error);
    return { error: error.message, data: null };
  }

  // Revalidate business page to show updated rating
  const { data: business } = await supabase
    .from("businesses")
    .select("slug")
    .eq("id", review.business_id)
    .single();

  if ((business as any)?.slug) {
    revalidatePath(`/businesses/${(business as any).slug}`);
  }

  return { error: null, data: newReview };
}

export async function setPrimaryPhoto(photoId: string, businessId: string) {
  const supabase = await createClient();

  // First, set all photos for this business to not primary
  await (supabase as any)
    .from("photos")
    .update({ is_primary: false })
    .eq("business_id", businessId);

  // Then set the selected photo as primary
  const { data: photo, error } = await (supabase as any)
    .from("photos")
    .update({ is_primary: true })
    .eq("id", photoId)
    .select()
    .single();

  if (error) {
    console.error("Error setting primary photo:", error);
    return { error: error.message, data: null };
  }

  return { error: null, data: photo };
}
