import { MetadataRoute } from "next";
import { getAllBusinessSlugs } from "@/lib/supabase/queries";
import { SOCAL_CITIES, SITE_URL } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const businessSlugs = await getAllBusinessSlugs();

  const businesses: MetadataRoute.Sitemap = businessSlugs.map((slug) => ({
    url: `${SITE_URL}/businesses/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const cities: MetadataRoute.Sitemap = SOCAL_CITIES.map((city) => ({
    url: `${SITE_URL}/${city.value}`,
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
