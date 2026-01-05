# SoCal Stump Removal Directory - MVP

A complete business directory platform for tree stump removal services across Southern California. Built with Next.js 14, Supabase, and Tailwind CSS.

## 🚀 Features

### For Visitors
- **Advanced Search** - Find stump removal services by location, rating, price range
- **Business Listings** - Detailed business profiles with photos, reviews, hours, and service areas
- **Reviews & Ratings** - Read authentic reviews from verified customers
- **Contact Forms** - Request quotes directly from businesses
- **City Landing Pages** - SEO-optimized pages for major SoCal cities
- **Mobile Responsive** - Fully responsive design for all devices

### For Business Owners
- **Claim Listings** - Claim and verify your business
- **Dashboard** - Manage business information, photos, and hours
- **Lead Management** - View and respond to form submissions
- **Photo Gallery** - Upload and manage business photos

### SEO Optimized
- **Schema.org Markup** - LocalBusiness structured data
- **Dynamic Metadata** - Optimized meta tags for every page
- **Sitemap Generation** - Automatic sitemap with all businesses and cities
- **Clean URLs** - SEO-friendly URL structure
- **Image Optimization** - Next.js Image component throughout

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **Email**: Resend API
- **Maps**: Google Maps API
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Google Maps API key
- Resend API key (for emails)

## ⚙️ Setup Instructions

### 1. Clone and Install Dependencies

```bash
cd socal-stump-removal
npm install
```

### 2. Set Up Supabase Database

1. Log in to your [Supabase Dashboard](https://app.supabase.com)
2. Open your project's SQL Editor
3. Run the migration file: `supabase/migrations/001_initial_schema.sql`
4. Run the seed file: `supabase/seed.sql`

This will create:
- 8 database tables with Row Level Security
- Indexes for performance
- Database functions and triggers
- 6 default categories
- 15 sample businesses with reviews

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Fill in your credentials in `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Resend
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

**Get your credentials:**
- **Supabase**: Project Settings → API
- **Google Maps**: [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials
- **Resend**: [Resend Dashboard](https://resend.com/api-keys)

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application!

## 📁 Project Structure

```
/app
  /layout.tsx                    # Root layout with Header/Footer
  /page.tsx                      # Homepage with hero, search, featured businesses
  /sitemap.ts                    # Dynamic sitemap generation
  /robots.ts                     # Robots.txt configuration
  /businesses/[slug]/page.tsx    # Business detail pages (TO DO)
  /search/page.tsx               # Search results with filters (TO DO)
  /[city]/page.tsx               # City landing pages (TO DO)
  /claim/page.tsx                # Business claiming flow (TO DO)
  /dashboard/*                   # Business owner dashboard (TO DO)

/components
  /ui/                           # shadcn/ui components (✅ installed)
  /layout/
    /Header.tsx                  # Site header (✅ done)
    /Footer.tsx                  # Site footer (✅ done)
  /business/
    /BusinessCard.tsx            # Business listing card (✅ done)
    /BusinessHeader.tsx          # Business detail header (TO DO)
    /ReviewList.tsx              # Review display (TO DO)
    /PhotoGallery.tsx            # Image gallery (TO DO)
  /search/
    /SearchBar.tsx               # Homepage search (✅ done)
    /FilterPanel.tsx             # Search filters (TO DO)
  /forms/
    /ContactForm.tsx             # Contact form (TO DO)
    /QuoteForm.tsx               # Quote request form (TO DO)

/lib
  /supabase/
    /client.ts                   # Browser Supabase client (✅ done)
    /server.ts                   # Server Supabase client (✅ done)
    /queries.ts                  # Database queries (✅ done)
    /mutations.ts                # Database mutations (✅ done)
    /types.ts                    # TypeScript types (✅ done)
  /seo/
    /metadata.ts                 # Metadata utilities (✅ done)
    /schema.ts                   # Schema.org generators (✅ done)
  /utils.ts                      # Utility functions (✅ done)
  /constants.ts                  # App constants (✅ done)

/supabase
  /migrations/
    /001_initial_schema.sql      # Database schema (✅ done)
  /seed.sql                      # Seed data (✅ done)
```

## ✅ Completed Features

- [x] Next.js 14 project setup with TypeScript
- [x] Tailwind CSS with brand colors (#2d5016 forest green, #ff6b35 orange)
- [x] Complete database schema with RLS policies
- [x] 15 sample businesses across Southern California
- [x] Supabase client configuration (browser and server)
- [x] Database queries and mutations
- [x] TypeScript types for all entities
- [x] shadcn/ui components installed
- [x] SEO utilities (metadata, Schema.org)
- [x] Header and Footer components
- [x] Homepage with hero, search, and featured businesses
- [x] BusinessCard component
- [x] SearchBar component
- [x] Sitemap and robots.txt generation
- [x] Environment variables template

## 🚧 Remaining Work

### High Priority Pages (Core MVP)

#### 1. Business Detail Page (`app/businesses/[slug]/page.tsx`)
Create a dynamic page showing:
- Business header with name, rating, contact buttons
- Photo gallery
- Description and service details
- Hours and service areas
- Reviews list
- Contact and quote forms
- Schema.org LocalBusiness markup

#### 2. Search Results Page (`app/search/page.tsx`)
Implement search with:
- FilterPanel component (location, category, rating, price)
- Business results grid
- Map integration (Google Maps)
- Pagination
- URL params for filters

#### 3. City Landing Pages (`app/[city]/page.tsx`)
SEO pages with:
- City-specific H1 and content
- List of businesses serving that city
- Dynamic metadata
- Schema.org breadcrumbs

### Medium Priority (Enhanced UX)

#### 4. Contact/Quote Forms
- ContactForm component with validation
- QuoteForm with additional fields
- Server actions to save submissions
- Email notifications via Resend

#### 5. Business Claiming Flow
- Claim business page (`/claim`)
- Email verification (`/claim/verify`)
- Supabase Auth integration

#### 6. Business Dashboard
- Protected layout with auth
- Edit business information
- Manage photos
- View form submissions

### Lower Priority (Nice to Have)

- Business owner authentication pages
- Review submission form
- Advanced map features
- Email templates with React Email
- Admin panel for claim approvals

## 🎯 Quick Start Guide

### Test the Homepage

After setup, you should see:
1. Hero section with search bar
2. 6 featured businesses (from seed data)
3. "How It Works" section
4. Business owner CTA

### Next Steps to Complete MVP

1. **Create Business Detail Page** - Most important for SEO
   - Copy structure from IMPLEMENTATION_GUIDE.md
   - Add Schema.org markup
   - Implement contact forms

2. **Build Search Page** - Core functionality
   - Use `searchBusinesses()` query
   - Add FilterPanel component
   - Implement pagination

3. **Generate City Pages** - SEO boost
   - Dynamic routes for all cities
   - Use `getBusinessesByCity()` query
   - Add local SEO content

## 📊 Database Tables

- **businesses** - Core business data
- **categories** - Service categories
- **business_categories** - Many-to-many relationship
- **reviews** - Customer reviews (auto-updates ratings)
- **photos** - Business photos
- **users** - Business owners
- **business_claims** - Claim verification
- **form_submissions** - Contact/quote requests

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Public read access for businesses, categories, reviews, photos
- Authenticated users can create claims
- Business owners can only modify their own data
- Form submissions visible only to business owners

## 🚀 Deployment

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Set environment variables in Vercel dashboard:
- Go to Project Settings → Environment Variables
- Add all variables from `.env.local`
- Redeploy

### Build for Production

```bash
npm run build
npm start
```

## 📝 Development Tips

- **Hot Reload**: Changes to components update instantly
- **TypeScript**: Strict typing for all database operations
- **Database Changes**: Update schema, run migration, restart dev server
- **SEO Testing**: Use Google's Rich Results Test for Schema.org
- **Mobile Testing**: Test responsive design on various devices

## 🤝 Contributing

This is an MVP. Future enhancements:
- Advanced search filters
- Business analytics dashboard
- Payment integration for featured listings
- Review moderation system
- Blog/content section
- Social media integration

## 📄 License

Proprietary - All rights reserved

## 🆘 Support

For issues with:
- **Supabase**: Check RLS policies and API keys
- **Build Errors**: Clear `.next` folder and rebuild
- **TypeScript**: Ensure all types are imported from `lib/supabase/types`
- **Styling**: Check Tailwind class names and CSS variables

---

**Built with ❤️ for Southern California businesses**
