import { searchBusinesses } from "@/lib/supabase/queries";
import BusinessCard from "@/components/business/BusinessCard";
import { generateSearchMetadata } from "@/lib/seo/metadata";
import { SearchX } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
    <div className="bg-gradient-to-br from-amber-50 via-stone-50 to-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
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
          <div className="text-center py-16">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <SearchX className="h-10 w-10 text-gray-600" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-gray-900">No results found</h3>
            <p className="mt-2 text-gray-600 max-w-md mx-auto">
              We couldn't find any businesses matching your criteria. Try adjusting your search.
            </p>
            <div className="mt-6">
              <Link href="/search">
                <Button variant="outline">Browse All Services</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}