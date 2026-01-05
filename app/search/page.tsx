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