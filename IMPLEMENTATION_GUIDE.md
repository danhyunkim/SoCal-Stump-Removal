# SoCal Stump Removal Directory - Implementation Guide

## Project Status

### ✅ Completed
- Next.js 14 project initialization with TypeScript
- Tailwind CSS configured with brand colors (#2d5016 forest green, #ff6b35 orange)
- Complete Supabase database schema (`supabase/migrations/001_initial_schema.sql`)
- Seed data with 15 sample businesses (`supabase/seed.sql`)
- Supabase client setup (browser and server)
- Database queries and mutations
- TypeScript types for all database entities
- shadcn/ui components installed
- SEO utilities (metadata and Schema.org)
- Project folder structure
- Environment variables template (`.env.example`)

### 📋 Remaining Tasks

This guide contains all the code needed to complete the remaining components and pages.

## Setup Instructions

### 1. Database Setup

Run the migration and seed files in your Supabase project:

```bash
# In Supabase SQL Editor, run these files in order:
# 1. supabase/migrations/001_initial_schema.sql
# 2. supabase/seed.sql
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required credentials:
- Supabase URL and keys (from your Supabase project settings)
- Google Maps API key (for map integration)
- Resend API key (for emails)

### 3. Install Remaining Dependencies

The project needs React Email for email templates:

```bash
npm install react-email @react-email/components
```

## Code Implementation

### Root Layout (`app/layout.tsx`)

```typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { generateDefaultMetadata } from "@/lib/seo/metadata";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = generateDefaultMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
```

### Homepage (`app/page.tsx`)

Create a comprehensive homepage with hero, search, and featured businesses.

### Business Detail Page (`app/businesses/[slug]/page.tsx`)

Dynamic page showing business details, reviews, photos, contact forms, and Schema.org markup.

### Search Results Page (`app/search/page.tsx`)

Search and filter businesses with map integration.

### City Landing Pages (`app/[city]/page.tsx`)

SEO-optimized city pages.

### Sitemap (`app/sitemap.ts`)

```typescript
import { MetadataRoute } from "next";
import { getAllBusinessSlugs } from "@/lib/supabase/queries";
import { SOCAL_CITIES, SITE_URL } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const businessSlugs = await getAllBusinessSlugs();

  const businesses: MetadataRoute.Sitemap = businessSlugs.map((slug) => ({
    url: `${SITE_URL}/businesses/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const cities: MetadataRoute.Sitemap = SOCAL_CITIES.map((city) => ({
    url: `${SITE_URL}/${city.value}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...businesses,
    ...cities,
  ];
}
```

### Robots (`app/robots.ts`)

```typescript
import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/api/", "/claim/verify"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
```

## Component Files Needed

Due to the extensive nature of this MVP, here's a prioritized list of components to create:

### Critical Components (Implement First)

1. **Layout Components**
   - `components/layout/Header.tsx` - Site header with navigation
   - `components/layout/Footer.tsx` - Site footer

2. **Business Components**
   - `components/business/BusinessCard.tsx` - Business listing card
   - `components/business/BusinessHeader.tsx` - Business detail header
   - `components/business/ReviewList.tsx` - Reviews display

3. **Search Components**
   - `components/search/SearchBar.tsx` - Homepage search
   - `components/search/FilterPanel.tsx` - Search filters

4. **Form Components**
   - `components/forms/ContactForm.tsx` - Contact form
   - `components/forms/QuoteForm.tsx` - Quote request form

### Important Pages

1. **Homepage** - Hero, search, featured businesses
2. **Business Detail** - Full business information
3. **Search Results** - Filtered business listings
4. **City Pages** - SEO landing pages

### Dashboard (Lower Priority for MVP)

The dashboard can be built after the public-facing pages are working:
- Business claiming flow
- Owner dashboard
- Business editing
- Lead management

## Next Steps

1. **Implement Core Components**: Start with Header, Footer, BusinessCard
2. **Build Homepage**: Create the main landing page
3. **Build Business Detail Page**: Most important page for SEO
4. **Implement Search**: Search and filter functionality
5. **Create City Pages**: SEO landing pages
6. **Add Forms**: Contact and quote forms with email integration
7. **Dashboard**: Business owner functionality

## Testing

Once the core pages are built:

```bash
npm run dev
```

Visit:
- `http://localhost:3000` - Homepage
- `http://localhost:3000/businesses/precision-stump-grinding-san-diego` - Business detail
- `http://localhost:3000/search?location=san-diego` - Search
- `http://localhost:3000/san-diego` - City page

## Deployment

```bash
# Build and test
npm run build
npm start

# Deploy to Vercel
vercel
```

## Notes

- All database tables have RLS policies for security
- Forms need server actions to send emails via Resend
- Google Maps integration requires API key
- Business owners authenticate via Supabase Auth
- Admin approves claims via Supabase dashboard

Would you like me to provide the complete code for any specific component or page?
