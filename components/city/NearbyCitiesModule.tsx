import Link from "next/link";
import { MapPin } from "lucide-react";
import type { IndexableCity } from "@/lib/seo/city-helpers";

interface NearbyCitiesModuleProps {
  cities: IndexableCity[];
  currentCity: string;
}

export default function NearbyCitiesModule({ cities, currentCity }: NearbyCitiesModuleProps) {
  if (cities.length === 0) return null;

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-gray-900">
              Nearby Cities with Stump Removal Services
            </h2>
          </div>
          <p className="text-gray-600 mb-6">
            Can't find providers in {currentCity}? These nearby cities have verified stump removal professionals ready to help:
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div>
                  <div className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {city.label}
                  </div>
                  {city.county && (
                    <div className="text-sm text-gray-600">{city.county}</div>
                  )}
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-primary">
                  <span>{city.count}</span>
                  <span className="text-gray-600">provider{city.count !== 1 ? "s" : ""}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
