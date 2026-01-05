export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
        };
      };
      businesses: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          phone: string | null;
          email: string | null;
          website: string | null;
          address: string | null;
          city: string | null;
          county: string | null;
          zip_code: string | null;
          latitude: number | null;
          longitude: number | null;
          service_areas: Json;
          is_featured: boolean;
          is_claimed: boolean;
          owner_id: string | null;
          rating: number;
          review_count: number;
          price_range: "$" | "$$" | "$$$" | null;
          hours: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          description?: string | null;
          phone?: string | null;
          email?: string | null;
          website?: string | null;
          address?: string | null;
          city?: string | null;
          county?: string | null;
          zip_code?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          service_areas?: Json;
          is_featured?: boolean;
          is_claimed?: boolean;
          owner_id?: string | null;
          rating?: number;
          review_count?: number;
          price_range?: "$" | "$$" | "$$$" | null;
          hours?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          description?: string | null;
          phone?: string | null;
          email?: string | null;
          website?: string | null;
          address?: string | null;
          city?: string | null;
          county?: string | null;
          zip_code?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          service_areas?: Json;
          is_featured?: boolean;
          is_claimed?: boolean;
          owner_id?: string | null;
          price_range?: "$" | "$$" | "$$$" | null;
          hours?: Json;
          updated_at?: string;
        };
      };
      business_categories: {
        Row: {
          business_id: string;
          category_id: string;
        };
        Insert: {
          business_id: string;
          category_id: string;
        };
        Update: {
          business_id?: string;
          category_id?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          business_id: string;
          author_name: string;
          rating: number;
          comment: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          author_name: string;
          rating: number;
          comment?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          business_id?: string;
          author_name?: string;
          rating?: number;
          comment?: string | null;
        };
      };
      photos: {
        Row: {
          id: string;
          business_id: string;
          url: string;
          alt_text: string | null;
          is_primary: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          url: string;
          alt_text?: string | null;
          is_primary?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          business_id?: string;
          url?: string;
          alt_text?: string | null;
          is_primary?: boolean;
        };
      };
      business_claims: {
        Row: {
          id: string;
          business_id: string;
          user_id: string;
          status: "pending" | "approved" | "rejected";
          verification_token: string | null;
          verified_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          user_id: string;
          status?: "pending" | "approved" | "rejected";
          verification_token?: string | null;
          verified_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          business_id?: string;
          user_id?: string;
          status?: "pending" | "approved" | "rejected";
          verification_token?: string | null;
          verified_at?: string | null;
        };
      };
      form_submissions: {
        Row: {
          id: string;
          business_id: string;
          form_type: "contact" | "quote";
          name: string;
          email: string;
          phone: string | null;
          message: string | null;
          service_type: string | null;
          property_size: string | null;
          stump_count: string | null;
          urgency: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          business_id: string;
          form_type: "contact" | "quote";
          name: string;
          email: string;
          phone?: string | null;
          message?: string | null;
          service_type?: string | null;
          property_size?: string | null;
          stump_count?: string | null;
          urgency?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          business_id?: string;
          form_type?: "contact" | "quote";
          name?: string;
          email?: string;
          phone?: string | null;
          message?: string | null;
          service_type?: string | null;
          property_size?: string | null;
          stump_count?: string | null;
          urgency?: string | null;
        };
      };
    };
  };
}

// Helper types for use in components
export type Business = Database["public"]["Tables"]["businesses"]["Row"];
export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type Review = Database["public"]["Tables"]["reviews"]["Row"];
export type Photo = Database["public"]["Tables"]["photos"]["Row"];
export type BusinessClaim = Database["public"]["Tables"]["business_claims"]["Row"];
export type FormSubmission = Database["public"]["Tables"]["form_submissions"]["Row"];
export type User = Database["public"]["Tables"]["users"]["Row"];

// Extended types with relations
export type BusinessWithDetails = Business & {
  categories?: Category[];
  photos?: Photo[];
  reviews?: Review[];
};

export type Hours = {
  [key: string]: string;
};

export type ServiceArea = string[];
