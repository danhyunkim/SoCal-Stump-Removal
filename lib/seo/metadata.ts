import { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "../constants";
import { Business } from "../supabase/types";

export function generateDefaultMetadata(): Metadata {
  return {
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    keywords: [
      "stump removal",
      "tree stump removal",
      "stump grinding",
      "Southern California",
      "San Diego",
      "Los Angeles",
      "Orange County",
      "Riverside",
      "San Bernardino",
    ],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: SITE_URL,
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateBusinessMetadata(business: Business): Metadata {
  const title = `${business.name} - ${business.city}, ${business.county}`;
  const description =
    business.description ||
    `Professional tree stump removal services in ${business.city}. ${business.name} offers expert stump grinding and removal.`;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      url: `${SITE_URL}/businesses/${business.slug}`,
      title,
      description,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function generateCityPageMetadata(
  city: string,
  county: string
): Metadata {
  const title = `Tree Stump Removal in ${city}, California`;
  const description = `Find the best tree stump removal services in ${city}, ${county}. Compare local professionals, read reviews, and get free quotes from verified companies.`;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      url: `${SITE_URL}/${city.toLowerCase().replace(/\s+/g, "-")}`,
      title,
      description,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function generateSearchMetadata(location?: string): Metadata {
  const title = location
    ? `Stump Removal Services in ${location}`
    : "Search Stump Removal Services";
  const description = location
    ? `Find professional tree stump removal services in ${location}. Compare ratings, prices, and reviews.`
    : "Search and compare tree stump removal services across Southern California.";

  return {
    title,
    description,
    openGraph: {
      type: "website",
      title,
      description,
      siteName: SITE_NAME,
    },
  };
}
