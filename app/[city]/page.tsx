import { getBusinessesByCity, getBusinessCountByCity, getDistinctCitiesWithInventory, getDistinctCitiesWithInventoryBuildTime } from "@/lib/supabase/queries";
import BusinessCard from "@/components/business/BusinessCard";
import { generateCityPageMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbSchema } from "@/lib/seo/schema";
import { SOCAL_CITIES, MIN_BUSINESSES_TO_INDEX } from "@/lib/constants";
import { notFound } from "next/navigation";
import Link from "next/link";
import SearchBar from "@/components/search/SearchBar";
import { ChevronRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateCityContent, generateFAQSchema } from "@/lib/content/city-content-generator";
import CityAboutSection from "@/components/city/CityAboutSection";
import CityFAQSection from "@/components/city/CityFAQSection";
import CityCTASection from "@/components/city/CityCTASection";
import NearbyCitiesModule from "@/components/city/NearbyCitiesModule";
import { getNearbyIndexableCities } from "@/lib/seo/city-helpers";
import slugify from "slugify";

export async function generateStaticParams() {
  // Include all curated cities
  const curatedParams = SOCAL_CITIES.map((city) => ({
    city: city.value,
  }));

  // Include auto-discovered cities (cities in DB with ≥1 business)
  // Use build-time client to avoid cookies error
  const autoCities = await getDistinctCitiesWithInventoryBuildTime(1);
  const autoParams = autoCities
    .map((city) => ({
      city: slugify(city.city, { lower: true, strict: true }),
    }))
    .filter(
      (autoCity) =>
        !SOCAL_CITIES.some((curatedCity) => curatedCity.value === autoCity.city)
    );

  return [...curatedParams, ...autoParams];
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;

  // Check if this is a curated city
  const cityData = SOCAL_CITIES.find((c) => c.value === city);

  if (cityData) {
    // Curated city - compute business count for indexing decision
    const businessCount = await getBusinessCountByCity(cityData.label);
    const shouldIndex = businessCount >= MIN_BUSINESSES_TO_INDEX;
    return generateCityPageMetadata(cityData.label, cityData.county, shouldIndex);
  }

  // Auto-discovered city - find matching city in DB
  const autoCities = await getDistinctCitiesWithInventory(1);
  const autoCity = autoCities.find(
    (c) => slugify(c.city, { lower: true, strict: true }) === city
  );

  if (!autoCity) return {};

  // Use city data from DB
  const shouldIndex = autoCity.count >= MIN_BUSINESSES_TO_INDEX;
  return generateCityPageMetadata(
    autoCity.city,
    autoCity.county || "Southern California",
    shouldIndex
  );
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;

  // Check if this is a curated city
  const cityData = SOCAL_CITIES.find((c) => c.value === city);

  // Determine city info and whether it's curated
  let cityName: string;
  let countyName: string;
  let isCurated: boolean;

  if (cityData) {
    // Curated city
    cityName = cityData.label;
    countyName = cityData.county;
    isCurated = true;
  } else {
    // Auto-discovered city - fetch from DB
    const autoCities = await getDistinctCitiesWithInventory(1);
    const autoCity = autoCities.find(
      (c) => slugify(c.city, { lower: true, strict: true }) === city
    );

    if (!autoCity) {
      notFound();
    }

    cityName = autoCity.city;
    countyName = autoCity.county || "Southern California";
    isCurated = false;
  }

  // Get businesses and count
  const businesses = await getBusinessesByCity(cityName, 20);
  const businessCount = businesses.length; // Use actual fetched count for accurate rendering

  // Get nearby cities for low-inventory or auto-discovered cities
  const nearbyCities = await getNearbyIndexableCities(city, countyName, 10);

  // Generate SEO content only for curated cities
  const cityContent = isCurated
    ? generateCityContent(cityName, city, countyName)
    : null;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: cityName, url: `/${city}` },
  ]);

  const faqSchema = cityContent ? generateFAQSchema(cityContent.faqs) : null;

  // Determine what content to show based on business count and city type
  const hasEnoughBusinesses = businessCount >= MIN_BUSINESSES_TO_INDEX;
  const showFullSEO = isCurated && hasEnoughBusinesses;
  const showMicroAbout = !isCurated && businessCount > 0;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-amber-50 via-stone-50 to-white py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">{cityName}</span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
            Tree Stump Removal in {cityName}, California
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl">
            Find professional stump removal and grinding services in {cityName}, {countyName}.
            Compare local experts, read reviews, and get free quotes from verified businesses.
          </p>

          <div className="mt-8 max-w-2xl">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* About Section - Only for curated cities with full SEO */}
      {showFullSEO && cityContent && (
        <CityAboutSection cityName={cityName} content={cityContent.aboutSection} />
      )}

      {/* Micro About Section - Only for auto-discovered cities with businesses */}
      {showMicroAbout && (
        <section className="bg-white py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this area</h2>
              <p className="text-gray-600">
                {cityName} is served by {businessCount} verified stump removal {businessCount === 1 ? "provider" : "providers"}.
                Browse listings below to compare services, read reviews, and request free quotes from local professionals.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Business Listings Section */}
      <div className="bg-gradient-to-br from-amber-50 via-stone-50 to-white" id="businesses">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {hasEnoughBusinesses ? "Top-Rated" : ""} Stump Removal Services in {cityName}
            </h2>
            <p className="mt-2 text-gray-600">
              {businesses.length} {businesses.length === 1 ? "business" : "businesses"} serving {cityName}
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
                We don't have any stump removal businesses listed in {cityName} yet, but we're constantly adding new services.
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
      </div>

      {/* Nearby Cities Module - Show for low inventory or auto-discovered cities */}
      {(!hasEnoughBusinesses || !isCurated) && nearbyCities.length > 0 && (
        <NearbyCitiesModule cities={nearbyCities} currentCity={cityName} />
      )}

      {/* FAQ Section - Only for curated cities with full SEO */}
      {showFullSEO && cityContent && (
        <CityFAQSection cityName={cityName} faqs={cityContent.faqs} />
      )}

      {/* CTA Section - Full version only for cities with enough businesses, simplified for others */}
      {hasEnoughBusinesses ? (
        <CityCTASection cityName={cityName} />
      ) : (
        <section className="bg-gradient-to-br from-primary/5 via-orange-50/30 to-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Need Stump Removal in {cityName}?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Get matched with verified professionals ready to serve your area.
              </p>
              <Link href="/claim">
                <Button className="bg-primary hover:bg-orange-600 active:bg-orange-700 text-white px-8 py-6 text-lg">
                  Request a Quote
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}