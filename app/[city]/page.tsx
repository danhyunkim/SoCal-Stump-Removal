import { getBusinessesByCity } from "@/lib/supabase/queries";
import BusinessCard from "@/components/business/BusinessCard";
import { generateCityPageMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbSchema } from "@/lib/seo/schema";
import { SOCAL_CITIES } from "@/lib/constants";
import { notFound } from "next/navigation";
import Link from "next/link";
import SearchBar from "@/components/search/SearchBar";
import { ChevronRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">{cityData.label}</span>
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

      <div className="container mx-auto px-4 py-12">
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
          <div className="text-center py-16">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Building2 className="h-10 w-10 text-primary" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-gray-900">No businesses listed yet</h3>
            <p className="mt-2 text-gray-600 max-w-md mx-auto">
              We don't have any stump removal businesses listed in {cityData.label} yet, but we're constantly adding new services.
            </p>
            <div className="mt-6 flex gap-4 justify-center">
              <Link href="/search">
                <Button variant="outline">Browse Other Cities</Button>
              </Link>
              <Link href="/claim">
                <Button className="bg-primary hover:bg-primary/90">List Your Business</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}