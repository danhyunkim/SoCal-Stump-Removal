import { getFeaturedBusinesses } from "@/lib/supabase/queries";
import SearchBar from "@/components/search/SearchBar";
import BusinessCard from "@/components/business/BusinessCard";
import { generateOrganizationSchema, generateSearchActionSchema } from "@/lib/seo/schema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Search, Star, Clock } from "lucide-react";

export default async function HomePage() {
  const featuredBusinesses = await getFeaturedBusinesses(6);

  const organizationSchema = generateOrganizationSchema();
  const searchActionSchema = generateSearchActionSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(searchActionSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-white py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Find Top-Rated{" "}
              <span className="text-primary">Stump Removal</span> Services
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Compare local stump removal professionals across Southern
              California. Read reviews, get free quotes, and hire with
              confidence.
            </p>
            <div className="mt-10">
              <SearchBar />
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Free Quotes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Verified Businesses</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Real Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      {featuredBusinesses.length > 0 && (
        <section className="py-16">
          <div className="container">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-gray-900">
                Featured Stump Removal Services
              </h2>
              <p className="mt-3 text-lg text-gray-600">
                Top-rated professionals in your area
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/search">
                <Button size="lg" variant="outline">
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section id="how-it-works" className="bg-gray-50 py-16">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-3 text-lg text-gray-600">
              Find and hire the perfect stump removal service in three easy
              steps
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">1. Search & Compare</h3>
              <p className="mt-2 text-gray-600">
                Browse local stump removal services, read reviews, and compare
                prices in your area.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">2. Get Free Quotes</h3>
              <p className="mt-2 text-gray-600">
                Contact multiple businesses directly and request free, no-obligation
                quotes for your project.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">3. Hire with Confidence</h3>
              <p className="mt-2 text-gray-600">
                Choose the best professional for your needs based on reviews,
                pricing, and availability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA for Business Owners */}
      <section className="border-t bg-primary py-16 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold">Own a Stump Removal Business?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-light/90">
            Get more customers by listing your business on SoCal Stump Removal
            Directory. Create your free listing today and start receiving leads.
          </p>
          <div className="mt-8">
            <Link href="/claim">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-gray-100"
              >
                List Your Business Free
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
