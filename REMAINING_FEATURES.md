# Remaining Features - Priority Order

## 🔴 HIGH PRIORITY (Core Functionality)

### 1. Contact & Quote Forms with Email Integration
**Why**: Essential for lead generation - the main business value
**Scope**:
- Create `ContactForm` component (name, email, phone, message, service type)
- Create `QuoteForm` component (+ property size, stump count, urgency)
- Integrate with Resend API
- Email templates for business owners
- Server actions for form submission
- Form validation with zod
- Success/error toast notifications
**Files to create**:
- `components/forms/ContactForm.tsx`
- `components/forms/QuoteForm.tsx`
- `app/api/send-email/route.ts` (or server action)
- `lib/email/templates.tsx`

**Estimate**: 2-3 hours

---

### 2. Business Claiming Flow
**Why**: Allows business owners to take ownership of their listings
**Scope**:
- `/claim` page - search for business to claim
- Sign up/sign in with Supabase Auth
- Email verification system
- Create business_claim record
- Verification email with token
- `/claim/verify` page for token validation
- Link business to user account (owner_id)
**Files to create**:
- `app/claim/page.tsx`
- `app/claim/verify/page.tsx`
- `lib/auth/` utilities
- Email templates for verification

**Estimate**: 3-4 hours

---

### 3. Business Owner Dashboard
**Why**: Lets business owners manage their listings and leads
**Scope**:
- Protected dashboard layout with auth middleware
- Dashboard home (stats overview, recent leads)
- Edit business info page (details, hours, service areas, photos)
- Lead management page (view form submissions, mark as contacted)
- Review management page (view reviews, respond - future)
- Photo upload to Supabase Storage
**Files to create**:
- `app/dashboard/layout.tsx`
- `app/dashboard/page.tsx`
- `app/dashboard/business/page.tsx`
- `app/dashboard/leads/page.tsx`
- `app/dashboard/reviews/page.tsx`
- `middleware.ts` (route protection)

**Estimate**: 4-5 hours

---

## 🟡 MEDIUM PRIORITY (Enhanced UX)

### 4. Search Filters & Pagination
**Why**: Improves search experience for users
**Scope**:
- Filter panel component (category, rating, price range, availability)
- URL-based filter state
- Pagination component
- "Load More" or numbered pagination
- Filter chips showing active filters
**Files to create/modify**:
- `components/search/FilterPanel.tsx`
- `components/search/Pagination.tsx`
- Update `app/search/page.tsx`

**Estimate**: 2-3 hours

---

### 5. Google Maps Integration
**Why**: Visual service area display, location context
**Scope**:
- Service area map component
- Map on business detail pages
- Map on search results (optional)
- Google Maps API integration
- Marker clustering for search results
**Files to create**:
- `components/map/ServiceAreaMap.tsx`
- `components/map/BusinessMap.tsx`
- Update business detail page

**Estimate**: 2-3 hours

---

### 6. Review System Enhancement
**Why**: Users can leave reviews (currently only seed data)
**Scope**:
- Review submission form
- Star rating input component
- Review moderation (admin review before publishing)
- Update business rating calculation trigger
- Review pagination
**Files to create**:
- `components/reviews/ReviewForm.tsx`
- `components/reviews/StarRating.tsx`
- Update queries to filter approved reviews

**Estimate**: 2-3 hours

---

## 🟢 LOW PRIORITY (Nice to Have)

### 7. Static Pages
**Why**: Legal compliance, trust building
**Scope**:
- About Us page
- Contact page
- Privacy Policy page
- Terms of Service page
- FAQ page
**Files to create**:
- `app/about/page.tsx`
- `app/contact/page.tsx`
- `app/privacy/page.tsx`
- `app/terms/page.tsx`
- `app/faq/page.tsx`

**Estimate**: 2-3 hours

---

### 8. Admin Panel (Future)
**Why**: Manage claims, moderate content
**Scope**:
- Admin login/role system
- Business claim approval UI
- Review moderation UI
- User management
- Analytics dashboard
**Files to create**:
- `app/admin/*` pages
- Admin middleware/guards

**Estimate**: 5-6 hours

---

### 9. Advanced Features (Future)
**Why**: Competitive advantages
**Scope**:
- Business comparison tool
- Favorite/save businesses
- Email notifications for new reviews
- Business analytics for owners
- Premium/featured listing payments
- Blog/content section
- Multi-photo upload with drag-drop
- Social media sharing

**Estimate**: 10+ hours

---

## 🎯 RECOMMENDED BUILD ORDER

1. **Contact & Quote Forms** (2-3 hrs) - Immediate business value
2. **Business Claiming Flow** (3-4 hrs) - Enables owner engagement
3. **Business Owner Dashboard** (4-5 hrs) - Completes core owner experience
4. **Search Filters & Pagination** (2-3 hrs) - Better user discovery
5. **Google Maps Integration** (2-3 hrs) - Visual enhancement
6. **Review System** (2-3 hrs) - User-generated content
7. **Static Pages** (2-3 hrs) - Legal compliance
8. **Admin Panel** (5-6 hrs) - Content management
9. **Advanced Features** (10+ hrs) - Long-term roadmap

---

## ✅ COMPLETED FEATURES

- ✅ Database schema with RLS
- ✅ Seed data (15 businesses)
- ✅ Homepage with featured businesses
- ✅ Business detail pages
- ✅ Search results page
- ✅ City landing pages (25 cities)
- ✅ SEO optimization (metadata, Schema.org, sitemap)
- ✅ Header & Footer components
- ✅ Business card components
- ✅ Search bar component
- ✅ UI polish (animations, lightbox, shadows, etc.)
- ✅ Mobile responsive design
- ✅ Production build working
- ✅ GitHub repository
- ✅ Vercel deployment

---

**Total Remaining Estimate for MVP**: 15-20 hours
**Total for Complete Platform**: 30-40 hours

Current Status: **~60% Complete** (Core pages done, missing forms/auth/dashboard)
