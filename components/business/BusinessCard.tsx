import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Phone, DollarSign } from "lucide-react";
import { BusinessWithDetails } from "@/lib/supabase/types";
import { formatPhoneNumber } from "@/lib/utils";

interface BusinessCardProps {
  business: BusinessWithDetails;
}

export default function BusinessCard({ business }: BusinessCardProps) {
  const primaryPhoto = business.photos?.find((p) => p.is_primary);

  return (
    <Link href={`/businesses/${business.slug}`}>
      <Card className="h-full transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1">
        {business.is_featured && (
          <div className="bg-gradient-to-r from-accent to-accent/90 px-3 py-1.5 flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-white text-white" />
            <p className="text-xs font-semibold text-white">
              FEATURED LISTING
            </p>
          </div>
        )}
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 line-clamp-1">
                {business.name}
              </h3>
              <div className="mt-1 flex items-center gap-2">
                {business.review_count > 0 && business.rating !== null && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">
                      {business.rating.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({business.review_count})
                    </span>
                  </div>
                )}
                {business.price_range && (
                  <span className="text-sm font-medium text-primary">
                    {business.price_range}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-gray-600 line-clamp-2">
            {business.description}
          </p>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 flex-shrink-0 text-gray-400" />
              <span className="line-clamp-1">
                {business.city}, {business.county}
              </span>
            </div>

            {business.phone && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4 flex-shrink-0 text-gray-400" />
                <span>{formatPhoneNumber(business.phone)}</span>
              </div>
            )}
          </div>

          {business.categories && business.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {business.categories.slice(0, 3).map((category) => (
                <Badge
                  key={category.id}
                  variant="secondary"
                  className="text-xs"
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
