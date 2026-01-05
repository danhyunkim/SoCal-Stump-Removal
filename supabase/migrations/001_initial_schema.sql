-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create businesses table
CREATE TABLE IF NOT EXISTS public.businesses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  address TEXT,
  city TEXT,
  county TEXT,
  zip_code TEXT,
  latitude NUMERIC(10, 8),
  longitude NUMERIC(11, 8),
  service_areas JSONB DEFAULT '[]'::jsonb,
  is_featured BOOLEAN DEFAULT FALSE,
  is_claimed BOOLEAN DEFAULT FALSE,
  owner_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  rating NUMERIC(3, 2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  price_range TEXT CHECK (price_range IN ('$', '$$', '$$$')),
  hours JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create business_categories junction table
CREATE TABLE IF NOT EXISTS public.business_categories (
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
  PRIMARY KEY (business_id, category_id)
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
  author_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create photos table
CREATE TABLE IF NOT EXISTS public.photos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
  url TEXT NOT NULL,
  alt_text TEXT,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create business_claims table
CREATE TABLE IF NOT EXISTS public.business_claims (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  verification_token TEXT,
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(business_id, user_id)
);

-- Create form_submissions table
CREATE TABLE IF NOT EXISTS public.form_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
  form_type TEXT NOT NULL CHECK (form_type IN ('contact', 'quote')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  service_type TEXT,
  property_size TEXT,
  stump_count TEXT,
  urgency TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_businesses_slug ON public.businesses(slug);
CREATE INDEX IF NOT EXISTS idx_businesses_city ON public.businesses(city);
CREATE INDEX IF NOT EXISTS idx_businesses_county ON public.businesses(county);
CREATE INDEX IF NOT EXISTS idx_businesses_is_featured ON public.businesses(is_featured);
CREATE INDEX IF NOT EXISTS idx_businesses_is_claimed ON public.businesses(is_claimed);
CREATE INDEX IF NOT EXISTS idx_businesses_owner_id ON public.businesses(owner_id);
CREATE INDEX IF NOT EXISTS idx_businesses_rating ON public.businesses(rating DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_business_id ON public.reviews(business_id);
CREATE INDEX IF NOT EXISTS idx_photos_business_id ON public.photos(business_id);
CREATE INDEX IF NOT EXISTS idx_business_claims_status ON public.business_claims(status);
CREATE INDEX IF NOT EXISTS idx_form_submissions_business_id ON public.form_submissions(business_id);
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON public.form_submissions(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for businesses table
CREATE POLICY "Anyone can view businesses" ON public.businesses
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create businesses" ON public.businesses
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Business owners can update their businesses" ON public.businesses
  FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Business owners can delete their businesses" ON public.businesses
  FOR DELETE USING (auth.uid() = owner_id);

-- RLS Policies for categories table
CREATE POLICY "Anyone can view categories" ON public.categories
  FOR SELECT USING (true);

-- RLS Policies for business_categories table
CREATE POLICY "Anyone can view business categories" ON public.business_categories
  FOR SELECT USING (true);

CREATE POLICY "Business owners can manage their business categories" ON public.business_categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.businesses
      WHERE id = business_id AND owner_id = auth.uid()
    )
  );

-- RLS Policies for reviews table
CREATE POLICY "Anyone can view reviews" ON public.reviews
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create reviews" ON public.reviews
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- RLS Policies for photos table
CREATE POLICY "Anyone can view photos" ON public.photos
  FOR SELECT USING (true);

CREATE POLICY "Business owners can manage their photos" ON public.photos
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.businesses
      WHERE id = business_id AND owner_id = auth.uid()
    )
  );

-- RLS Policies for business_claims table
CREATE POLICY "Users can view their own claims" ON public.business_claims
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can create claims" ON public.business_claims
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own claims" ON public.business_claims
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for form_submissions table
CREATE POLICY "Business owners can view their form submissions" ON public.form_submissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.businesses
      WHERE id = business_id AND owner_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can create form submissions" ON public.form_submissions
  FOR INSERT WITH CHECK (true);

-- Function to update business ratings when reviews are added/updated/deleted
CREATE OR REPLACE FUNCTION update_business_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.businesses
  SET
    rating = (SELECT AVG(rating)::NUMERIC(3,2) FROM public.reviews WHERE business_id = COALESCE(NEW.business_id, OLD.business_id)),
    review_count = (SELECT COUNT(*) FROM public.reviews WHERE business_id = COALESCE(NEW.business_id, OLD.business_id)),
    updated_at = NOW()
  WHERE id = COALESCE(NEW.business_id, OLD.business_id);
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger to update ratings
DROP TRIGGER IF EXISTS trigger_update_business_rating ON public.reviews;
CREATE TRIGGER trigger_update_business_rating
  AFTER INSERT OR UPDATE OR DELETE ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_business_rating();

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS trigger_update_businesses_updated_at ON public.businesses;
CREATE TRIGGER trigger_update_businesses_updated_at
  BEFORE UPDATE ON public.businesses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_update_users_updated_at ON public.users;
CREATE TRIGGER trigger_update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to generate unique slug
CREATE OR REPLACE FUNCTION generate_unique_slug(base_text TEXT)
RETURNS TEXT AS $$
DECLARE
  slug TEXT;
  counter INTEGER := 0;
BEGIN
  slug := regexp_replace(lower(trim(base_text)), '[^a-z0-9\s-]', '', 'g');
  slug := regexp_replace(slug, '[\s_-]+', '-', 'g');
  slug := regexp_replace(slug, '^-+|-+$', '', 'g');

  WHILE EXISTS (SELECT 1 FROM public.businesses WHERE businesses.slug = slug) LOOP
    counter := counter + 1;
    slug := slug || '-' || counter;
  END LOOP;

  RETURN slug;
END;
$$ LANGUAGE plpgsql;

-- Insert default categories
INSERT INTO public.categories (name, slug, description) VALUES
  ('Residential Stump Removal', 'residential', 'Professional stump removal services for residential properties'),
  ('Commercial Stump Removal', 'commercial', 'Stump removal for commercial properties and businesses'),
  ('Emergency Service', 'emergency', '24/7 emergency stump removal services'),
  ('Stump Grinding', 'grinding', 'Specialized stump grinding services'),
  ('Full Stump Removal', 'full-removal', 'Complete stump removal including roots'),
  ('Large Stump Specialist', 'large-stumps', 'Experts in removing large and difficult stumps')
ON CONFLICT (slug) DO NOTHING;

-- Create storage bucket for business photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('business-photos', 'business-photos', true)
ON CONFLICT DO NOTHING;

-- Storage policies for business photos
CREATE POLICY "Anyone can view business photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'business-photos');

CREATE POLICY "Authenticated users can upload business photos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'business-photos' AND
    auth.uid() IS NOT NULL
  );

CREATE POLICY "Business owners can delete their business photos" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'business-photos' AND
    auth.uid() IS NOT NULL
  );
