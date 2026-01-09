import { SOCAL_CITIES, MIN_BUSINESSES_TO_INDEX } from "@/lib/constants";
import { getBusinessCountByCity, getDistinctCitiesWithInventory, getBusinessCountByCityBuildTime, getDistinctCitiesWithInventoryBuildTime } from "@/lib/supabase/queries";
import slugify from "slugify";

export interface IndexableCity {
  slug: string;
  label: string;
  county?: string;
  count: number;
}

/**
 * Get all cities that meet the indexing threshold
 * Cached at build time for sitemap generation
 */
export async function getIndexableCities(): Promise<IndexableCity[]> {
  const indexableCities: IndexableCity[] = [];

  // Check all curated cities
  for (const city of SOCAL_CITIES) {
    const count = await getBusinessCountByCity(city.label);
    if (count >= MIN_BUSINESSES_TO_INDEX) {
      indexableCities.push({
        slug: city.value,
        label: city.label,
        county: city.county,
        count,
      });
    }
  }

  // Check auto-discovered cities
  const autoCities = await getDistinctCitiesWithInventory(MIN_BUSINESSES_TO_INDEX);

  for (const autoCity of autoCities) {
    const citySlug = slugify(autoCity.city, { lower: true, strict: true });

    // Skip if already in curated list
    if (SOCAL_CITIES.some((c) => c.value === citySlug)) {
      continue;
    }

    indexableCities.push({
      slug: citySlug,
      label: autoCity.city,
      county: autoCity.county,
      count: autoCity.count,
    });
  }

  return indexableCities.sort((a, b) => b.count - a.count);
}

/**
 * Build-time version of getIndexableCities for use in sitemap/generateStaticParams
 * This doesn't use cookies and is suitable for static site generation
 */
export async function getIndexableCitiesBuildTime(): Promise<IndexableCity[]> {
  const indexableCities: IndexableCity[] = [];

  // Check all curated cities
  const curatedCounts = await Promise.all(
    SOCAL_CITIES.map(async (city) => ({
      city,
      count: await getBusinessCountByCityBuildTime(city.label),
    }))
  );

  for (const { city, count } of curatedCounts) {
    if (count >= MIN_BUSINESSES_TO_INDEX) {
      indexableCities.push({
        slug: city.value,
        label: city.label,
        county: city.county,
        count,
      });
    }
  }

  // Check auto-discovered cities
  const autoCities = await getDistinctCitiesWithInventoryBuildTime(MIN_BUSINESSES_TO_INDEX);

  for (const autoCity of autoCities) {
    const citySlug = slugify(autoCity.city, { lower: true, strict: true });

    // Skip if already in curated list
    if (SOCAL_CITIES.some((c) => c.value === citySlug)) {
      continue;
    }

    indexableCities.push({
      slug: citySlug,
      label: autoCity.city,
      county: autoCity.county,
      count: autoCity.count,
    });
  }

  return indexableCities.sort((a, b) => b.count - a.count);
}

/**
 * Get nearby cities with inventory for internal linking
 * Prioritizes same county, then by business count
 */
export async function getNearbyIndexableCities(
  currentCitySlug: string,
  currentCounty?: string,
  limit: number = 10
): Promise<IndexableCity[]> {
  const allIndexable = await getIndexableCities();

  // Remove current city
  const others = allIndexable.filter((c) => c.slug !== currentCitySlug);

  // Prioritize same county if provided
  if (currentCounty) {
    const sameCounty = others.filter((c) => c.county === currentCounty);
    const otherCounty = others.filter((c) => c.county !== currentCounty);

    return [...sameCounty, ...otherCounty].slice(0, limit);
  }

  return others.slice(0, limit);
}
