// Southern California Cities and Counties
export const SOCAL_COUNTIES = [
  { value: "san-diego", label: "San Diego County" },
  { value: "los-angeles", label: "Los Angeles County" },
  { value: "orange", label: "Orange County" },
  { value: "riverside", label: "Riverside County" },
  { value: "san-bernardino", label: "San Bernardino County" },
  { value: "ventura", label: "Ventura County" },
  { value: "imperial", label: "Imperial County" },
];

export const SOCAL_CITIES = [
  // Popular cities in footer order
  { value: "los-angeles", label: "Los Angeles", county: "Los Angeles County" },
  { value: "long-beach", label: "Long Beach", county: "Los Angeles County" },
  { value: "malibu", label: "Malibu", county: "Los Angeles County" },
  { value: "anaheim", label: "Anaheim", county: "Orange County" },
  { value: "huntington-beach", label: "Huntington Beach", county: "Orange County" },
  { value: "irvine", label: "Irvine", county: "Orange County" },
  { value: "laguna-beach", label: "Laguna Beach", county: "Orange County" },
  { value: "riverside", label: "Riverside", county: "Riverside County" },
  { value: "san-diego", label: "San Diego", county: "San Diego County" },
  { value: "carlsbad", label: "Carlsbad", county: "San Diego County" },

  // Additional Los Angeles County cities
  { value: "pasadena", label: "Pasadena", county: "Los Angeles County" },
  { value: "glendale", label: "Glendale", county: "Los Angeles County" },
  { value: "torrance", label: "Torrance", county: "Los Angeles County" },
  { value: "burbank", label: "Burbank", county: "Los Angeles County" },

  // Additional Orange County cities
  { value: "santa-ana", label: "Santa Ana", county: "Orange County" },
  { value: "newport-beach", label: "Newport Beach", county: "Orange County" },
  { value: "costa-mesa", label: "Costa Mesa", county: "Orange County" },

  // Additional San Diego County cities
  { value: "chula-vista", label: "Chula Vista", county: "San Diego County" },
  { value: "oceanside", label: "Oceanside", county: "San Diego County" },
  { value: "escondido", label: "Escondido", county: "San Diego County" },
  { value: "el-cajon", label: "El Cajon", county: "San Diego County" },

  // Additional Riverside County cities
  { value: "temecula", label: "Temecula", county: "Riverside County" },
  { value: "murrieta", label: "Murrieta", county: "Riverside County" },
  { value: "corona", label: "Corona", county: "Riverside County" },

  // San Bernardino County
  { value: "san-bernardino", label: "San Bernardino", county: "San Bernardino County" },
  { value: "fontana", label: "Fontana", county: "San Bernardino County" },
  { value: "rancho-cucamonga", label: "Rancho Cucamonga", county: "San Bernardino County" },
];

export const SERVICE_TYPES = [
  { value: "residential", label: "Residential Stump Removal" },
  { value: "commercial", label: "Commercial Stump Removal" },
  { value: "emergency", label: "Emergency Service" },
  { value: "grinding", label: "Stump Grinding" },
  { value: "full-removal", label: "Full Stump Removal" },
  { value: "large-stumps", label: "Large Stump Specialist" },
];

export const PRICE_RANGES = [
  { value: "$", label: "$ - Budget-friendly" },
  { value: "$$", label: "$$ - Moderate" },
  { value: "$$$", label: "$$$ - Premium" },
];

export const RATING_FILTERS = [
  { value: "4", label: "4+ Stars" },
  { value: "3", label: "3+ Stars" },
  { value: "2", label: "2+ Stars" },
];

// Default metadata
export const SITE_NAME = "SoCal Stump Removal Directory";
export const SITE_DESCRIPTION = "Find the best tree stump removal services in Southern California. Compare local professionals, read reviews, and get free quotes.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://socalstumpremoval.com";

// Business hours format
export const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
