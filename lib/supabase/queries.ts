import { createClient } from "./server";
import { Business, BusinessWithDetails, Review, Photo, Category } from "./types";

export interface SearchFilters {
  location?: string;
  category?: string;
  rating?: number;
  priceRange?: string;
  query?: string;
}

export async function getBusinessBySlug(
  slug: string
): Promise<BusinessWithDetails | null> {
  const supabase = await createClient();

  const { data: business, error } = await supabase
    .from("businesses")
    .select(
      `
      *,
      categories:business_categories(category:categories(*)),
      photos(*),
      reviews(*)
    `
    )
    .eq("slug", slug)
    .single();

  if (error || !business) {
    return null;
  }

  return {
    ...(business as any),
    categories: (business as any).categories?.map((bc: any) => bc.category) || [],
    photos: (business as any).photos || [],
    reviews: (business as any).reviews || [],
  };
}

export async function searchBusinesses(
  filters: SearchFilters = {},
  limit: number = 20,
  offset: number = 0
): Promise<{ businesses: BusinessWithDetails[]; total: number }> {
  const supabase = await createClient();
  let query = supabase.from("businesses").select(
    `
      *,
      categories:business_categories(category:categories(*)),
      photos(*)
    `,
    { count: "exact" }
  );

  // Apply filters
  if (filters.location) {
    const locationLower = filters.location.toLowerCase();
    query = query.or(
      `city.ilike.%${locationLower}%,county.ilike.%${locationLower}%,service_areas.cs.["${filters.location}"]`
    );
  }

  if (filters.query) {
    query = query.or(
      `name.ilike.%${filters.query}%,description.ilike.%${filters.query}%`
    );
  }

  if (filters.rating) {
    query = query.gte("rating", filters.rating);
  }

  if (filters.priceRange) {
    query = query.eq("price_range", filters.priceRange);
  }

  if (filters.category) {
    query = query.contains("categories.category.slug", filters.category);
  }

  // Order by featured first, then rating
  query = query
    .order("is_featured", { ascending: false })
    .order("rating", { ascending: false })
    .range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error || !data) {
    return { businesses: [], total: 0 };
  }

  const businesses = data.map((business: any) => ({
    ...business,
    categories: business.categories?.map((bc: any) => bc.category) || [],
    photos: business.photos || [],
  }));

  return { businesses, total: count || 0 };
}

export async function getBusinessesByCity(
  city: string,
  limit: number = 20
): Promise<BusinessWithDetails[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("businesses")
    .select(
      `
      *,
      categories:business_categories(category:categories(*)),
      photos(*)
    `
    )
    .or(`city.ilike.${city},service_areas.cs.["${city}"]`)
    .order("is_featured", { ascending: false })
    .order("rating", { ascending: false })
    .limit(limit);

  if (error || !data) {
    return [];
  }

  return data.map((business: any) => ({
    ...business,
    categories: business.categories?.map((bc: any) => bc.category) || [],
    photos: business.photos || [],
  }));
}

export async function getFeaturedBusinesses(
  limit: number = 6
): Promise<BusinessWithDetails[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("businesses")
    .select(
      `
      *,
      categories:business_categories(category:categories(*)),
      photos(*)
    `
    )
    .eq("is_featured", true)
    .order("rating", { ascending: false })
    .limit(limit);

  if (error || !data) {
    return [];
  }

  return data.map((business: any) => ({
    ...business,
    categories: business.categories?.map((bc: any) => bc.category) || [],
    photos: business.photos || [],
  }));
}

export async function getBusinessReviews(
  businessId: string,
  limit: number = 10,
  offset: number = 0
): Promise<Review[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("business_id", businessId)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error || !data) {
    return [];
  }

  return data;
}

export async function getBusinessPhotos(businessId: string): Promise<Photo[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("photos")
    .select("*")
    .eq("business_id", businessId)
    .order("is_primary", { ascending: false })
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data;
}

export async function getAllCategories(): Promise<Category[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error || !data) {
    return [];
  }

  return data;
}

export async function getAllBusinessSlugs(): Promise<string[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("businesses").select("slug");

  if (error || !data) {
    return [];
  }

  return (data as any[]).map((b) => b.slug);
}

export async function getBusinessesByOwner(
  ownerId: string
): Promise<Business[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("owner_id", ownerId)
    .order("name");

  if (error || !data) {
    return [];
  }

  return data;
}

export async function getFormSubmissionsForBusiness(
  businessId: string,
  limit: number = 50
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("form_submissions")
    .select("*")
    .eq("business_id", businessId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) {
    return [];
  }

  return data;
}
