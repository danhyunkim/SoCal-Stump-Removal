import { Business, Hours } from "../supabase/types";
import { SITE_NAME, SITE_URL } from "../constants";

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "Find the best tree stump removal services in Southern California. Compare local professionals, read reviews, and get free quotes.",
    areaServed: {
      "@type": "State",
      name: "California",
    },
  };
}

export function generateLocalBusinessSchema(business: Business) {
  const hours = business.hours as Hours;
  const openingHours = hours
    ? Object.entries(hours)
        .map(([day, time]) => {
          if (
            time === "Closed" ||
            time === "By Appointment" ||
            time.includes("24")
          ) {
            return null;
          }
          const dayAbbr = day.substring(0, 2);
          return `${dayAbbr} ${time}`;
        })
        .filter(Boolean)
    : [];

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/businesses/${business.slug}`,
    name: business.name,
    description: business.description,
    url: business.website || `${SITE_URL}/businesses/${business.slug}`,
    telephone: business.phone,
    email: business.email,
    priceRange: business.price_range || "$$",
    image: business.is_featured
      ? `${SITE_URL}/business-placeholder.jpg`
      : undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address,
      addressLocality: business.city,
      addressRegion: "CA",
      postalCode: business.zip_code,
      addressCountry: "US",
    },
    geo: business.latitude &&
      business.longitude && {
        "@type": "GeoCoordinates",
        latitude: business.latitude,
        longitude: business.longitude,
      },
    openingHoursSpecification:
      openingHours.length > 0
        ? openingHours.map((hours) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: hours?.split(" ")[0],
            opens: hours?.split(" ")[1]?.split("-")[0],
            closes: hours?.split(" ")[1]?.split("-")[1],
          }))
        : undefined,
    aggregateRating:
      business.review_count > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: business.rating,
            reviewCount: business.review_count,
            bestRating: 5,
            worstRating: 1,
          }
        : undefined,
    areaServed: business.service_areas
      ? (business.service_areas as string[]).map((area) => ({
          "@type": "City",
          name: area,
        }))
      : [
          {
            "@type": "City",
            name: business.city,
          },
        ],
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function generateSearchActionSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?query={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
