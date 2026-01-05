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