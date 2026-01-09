import { MetadataRoute } from "next";
import { getAllBusinessSlugsBuildTime } from "@/lib/supabase/queries";
import { SITE_URL } from "@/lib/constants";
import { getIndexableCitiesBuildTime } from "@/lib/seo/city-helpers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const businessSlugs = await getAllBusinessSlugsBuildTime();

  const businesses: MetadataRoute.Sitemap = businessSlugs.map((slug) => ({
    url: `${SITE_URL}/businesses/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Only include cities that meet the indexing threshold (≥3 businesses)
  // Use build-time version to avoid cookies error
  const indexableCities = await getIndexableCitiesBuildTime();
  const cities: MetadataRoute.Sitemap = indexableCities.map((city) => ({
    url: `${SITE_URL}/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...businesses,
    ...cities,
  ];
}
