# Next Steps to Complete the MVP

This document provides code snippets for the remaining high-priority pages to complete your MVP.

## Current Status

✅ **Completed:**
- Full database schema with 15 sample businesses
- Homepage with hero, search, and featured businesses
- Layout (Header/Footer)
- Core components (BusinessCard, SearchBar)
- All SEO utilities and configuration
- Supabase integration layer

🚧 **To Complete:**
1. Business Detail Page
2. Search Results Page
3. City Landing Pages
4. Contact/Quote Forms (optional for initial testing)

## 1. Business Detail Page

Create `app/businesses/[slug]/page.tsx`:

```typescript
import { notFound } from "next/navigation";
import { getBusinessBySlug } from "@/lib/supabase/queries";
import { generateBusinessMetadata } from "@/lib/seo/metadata";
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from "@/lib/seo/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MapPin, Phone, Globe, Clock, Mail } from "lucide-react";
import { formatPhoneNumber } from "@/lib/utils";
import Link from "next/link";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const business = await getBusinessBySlug(params.slug);
  if (!business) return {};
  return generateBusinessMetadata(business);
}

export default async function BusinessPage({ params }: { params: { slug: string } }) {
  const business = await getBusinessBySlug(params.slug);

  if (!business) {
    notFound();
  }

  const localBusinessSchema = generateLocalBusinessSchema(business);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: business.city || "Businesses", url: `/search?location=${business.city}` },
    { name: business.name, url: `/businesses/${business.slug}` },
  ]);

  const hours = business.hours as Record<string, string>;
  const serviceAreas = business.service_areas as string[];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="container py-8">
        {/* Breadcrumbs */}
        <div className="mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-primary">Home</Link>
          {" / "}
          <Link href={`/search?location=${business.city}`} className="hover:text-primary">
            {business.city}
          </Link>
          {" / "}
          <span className="text-gray-900">{business.name}</span>
        </div>

        {/* Business Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                {business.name}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-4">
                {business.review_count > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-semibold">
                        {business.rating.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-gray-600">
                      ({business.review_count} reviews)
                    </span>
                  </div>
                )}
                {business.price_range && (
                  <Badge variant="secondary" className="text-base">
                    {business.price_range}
                  </Badge>
                )}
                {business.is_featured && (
                  <Badge className="bg-accent text-white">Featured</Badge>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <Link href={`#contact`}>
                <Button size="lg" className="bg-accent hover:bg-accent-dark">
                  Get a Quote
                </Button>
              </Link>
              {!business.is_claimed && (
                <Link href={`/claim?business=${business.id}`}>
                  <Button size="lg" variant="outline">
                    Claim Business
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {business.description}
                </p>
              </CardContent>
            </Card>

            {/* Categories */}
            {business.categories && business.categories.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {business.categories.map((category) => (
                      <Badge key={category.id} variant="secondary">
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Reviews */}
            {business.reviews && business.reviews.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {business.reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4 last:border-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "fill-gray-200 text-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-medium">{review.author_name}</span>
                          <span className="text-sm text-gray-500">
                            {new Date(review.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        {review.comment && (
                          <p className="text-gray-700">{review.comment}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {business.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <a
                        href={`tel:${business.phone}`}
                        className="font-medium hover:text-primary"
                      >
                        {formatPhoneNumber(business.phone)}
                      </a>
                    </div>
                  </div>
                )}
                {business.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <a
                        href={`mailto:${business.email}`}
                        className="font-medium hover:text-primary break-all"
                      >
                        {business.email}
                      </a>
                    </div>
                  </div>
                )}
                {business.website && (
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Website</p>
                      <a
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:text-primary break-all"
                      >
                        {business.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  </div>
                )}
                {business.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-medium">
                        {business.address}
                        <br />
                        {business.city}, CA {business.zip_code}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Hours */}
            {hours && Object.keys(hours).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Business Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(hours).map(([day, time]) => (
                      <div key={day} className="flex justify-between">
                        <span className="text-gray-600">{day}</span>
                        <span className="font-medium">{time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Service Areas */}
            {serviceAreas && serviceAreas.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Service Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {serviceAreas.map((area) => (
                      <Badge key={area} variant="outline">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Contact Form Anchor */}
        <div id="contact" className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Get a Free Quote</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Contact {business.name} directly for a free, no-obligation quote.
              </p>
              <div className="flex gap-4">
                {business.phone && (
                  <a href={`tel:${business.phone}`}>
                    <Button size="lg" className="bg-primary hover:bg-primary-dark">
                      <Phone className="mr-2 h-5 w-5" />
                      Call Now
                    </Button>
                  </a>
                )}
                {business.email && (
                  <a href={`mailto:${business.email}`}>
                    <Button size="lg" variant="outline">
                      <Mail className="mr-2 h-5 w-5" />
                      Send Email
                    </Button>
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
```

## 2. Search Results Page

Create `app/search/page.tsx`:

```typescript
import { searchBusinesses } from "@/lib/supabase/queries";
import BusinessCard from "@/components/business/BusinessCard";
import { generateSearchMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  searchParams
}: {
  searchParams: { location?: string; query?: string }
}) {
  return generateSearchMetadata(searchParams.location);
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { location?: string; query?: string; category?: string; rating?: string };
}) {
  const filters = {
    location: searchParams.location,
    query: searchParams.query,
    category: searchParams.category,
    rating: searchParams.rating ? parseFloat(searchParams.rating) : undefined,
  };

  const { businesses, total } = await searchBusinesses(filters, 20, 0);

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {searchParams.location
            ? `Stump Removal in ${searchParams.location}`
            : "Stump Removal Services"}
        </h1>
        <p className="mt-2 text-gray-600">
          Found {total} {total === 1 ? "business" : "businesses"}
        </p>
      </div>

      {businesses.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {businesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">
            No businesses found. Try adjusting your search criteria.
          </p>
        </div>
      )}
    </div>
  );
}
```

## 3. City Landing Pages

Create `app/[city]/page.tsx`:

```typescript
import { getBusinessesByCity } from "@/lib/supabase/queries";
import BusinessCard from "@/components/business/BusinessCard";
import { generateCityPageMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbSchema } from "@/lib/seo/schema";
import { SOCAL_CITIES } from "@/lib/constants";
import { notFound } from "next/navigation";
import Link from "next/link";
import SearchBar from "@/components/search/SearchBar";

export async function generateStaticParams() {
  return SOCAL_CITIES.map((city) => ({
    city: city.value,
  }));
}

export async function generateMetadata({ params }: { params: { city: string } }) {
  const cityData = SOCAL_CITIES.find((c) => c.value === params.city);
  if (!cityData) return {};
  return generateCityPageMetadata(cityData.label, cityData.county);
}

export default async function CityPage({ params }: { params: { city: string } }) {
  const cityData = SOCAL_CITIES.find((c) => c.value === params.city);

  if (!cityData) {
    notFound();
  }

  const businesses = await getBusinessesByCity(cityData.label, 20);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: cityData.label, url: `/${params.city}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="bg-gradient-to-b from-primary/5 to-white py-12">
        <div className="container">
          <div className="mb-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">Home</Link>
            {" / "}
            <span className="text-gray-900">{cityData.label}</span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
            Tree Stump Removal in {cityData.label}, California
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl">
            Find professional stump removal and grinding services in {cityData.label}, {cityData.county}.
            Compare local experts, read reviews, and get free quotes from verified businesses.
          </p>

          <div className="mt-8 max-w-2xl">
            <SearchBar />
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Top-Rated Stump Removal Services in {cityData.label}
          </h2>
          <p className="mt-2 text-gray-600">
            {businesses.length} {businesses.length === 1 ? "business" : "businesses"} serving {cityData.label}
          </p>
        </div>

        {businesses.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {businesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              No businesses found in {cityData.label} yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </>
  );
}
```

## Testing Your Work

After creating these pages:

1. **Test Business Detail Page:**
   ```
   http://localhost:3000/businesses/precision-stump-grinding-san-diego
   ```

2. **Test Search:**
   ```
   http://localhost:3000/search?location=San Diego
   ```

3. **Test City Page:**
   ```
   http://localhost:3000/san-diego
   ```

## Quick Wins

After the 3 pages above are working:

1. **Build and test** - Run `npm run build` to check for errors
2. **Test SEO** - Use view-source to see Schema.org markup
3. **Deploy to Vercel** - Push to GitHub and connect to Vercel

## Optional Enhancements

Once the core pages work, you can add:
- Contact forms with server actions
- Google Maps integration
- Filter panel for search
- Business claiming flow
- Dashboard for business owners

The MVP is functional with just the 3 pages above + the homepage you already have!
