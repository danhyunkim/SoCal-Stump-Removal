import { CITY_CONTENT_DATA, generateCityFAQs, type CityFAQ } from "./city-data";

export interface GeneratedCityContent {
  aboutSection: string;
  faqs: CityFAQ[];
}

/**
 * Generates unique SEO-optimized content for each city page
 * Uses city-specific data to create varied content while maintaining structure
 */
export function generateCityContent(
  cityName: string,
  citySlug: string,
  countyName: string
): GeneratedCityContent {
  const cityData = CITY_CONTENT_DATA[citySlug];

  // Fallback for cities not in data (shouldn't happen but safety first)
  const neighborhoods = cityData?.neighborhoods || ["local neighborhoods"];
  const treeFacts = cityData?.treeFacts || "a diverse urban forest";
  const climateNote = cityData?.climateNote || "Southern California's favorable climate";
  const funFact = cityData?.funFact || "many properties benefit from professional tree services";

  // Generate varied about section using city-specific data
  const aboutSection = generateAboutSection(
    cityName,
    countyName,
    neighborhoods,
    treeFacts,
    climateNote,
    funFact
  );

  // Generate city-specific FAQs
  const faqs = generateCityFAQs(cityName, countyName);

  return {
    aboutSection,
    faqs,
  };
}

/**
 * Generates the about section with variations to avoid duplicate content
 * Each city gets unique phrasing while covering the same core topics
 */
function generateAboutSection(
  cityName: string,
  countyName: string,
  neighborhoods: string[],
  treeFacts: string,
  climateNote: string,
  funFact: string
): string {
  const neighborhoodList = neighborhoods.slice(0, 3).join(", ");

  // Use alternating paragraph structures for variation
  const variations = [
    // Variation A (cities 1-9)
    `${cityName} homeowners and property managers rely on professional stump removal services to maintain safe, beautiful outdoor spaces. Located in ${countyName}, ${cityName} is ${treeFacts}, and when trees need removal, they often leave behind unsightly and hazardous stumps.

Our directory connects you with licensed, insured stump removal professionals serving ${cityName} and surrounding areas including ${neighborhoodList}. Whether you need a single stump ground down or multiple stumps removed from your property, local experts can provide free quotes and same-day service in many cases.

Stump grinding is the most popular method used throughout ${cityName}. This process grinds the stump 6-12 inches below ground level, allowing you to replant grass or landscaping over the area. The method is faster, less invasive, and more affordable than complete stump removal, which involves extracting the entire root system. Most residential stump grinding jobs in ${cityName} take 1-3 hours depending on stump size and accessibility.

With ${climateNote}, ${cityName} properties benefit from year-round tree care services. Local stump removal companies carry specialized equipment including walk-behind grinders for tight spaces and large track-mounted machines for commercial properties. Fun fact: ${funFact}.`,

    // Variation B (cities 10-18)
    `Professional stump removal services help ${cityName} residents maintain beautiful, hazard-free properties across ${countyName}. ${cityName} is ${treeFacts}, and property owners frequently need expert assistance removing leftover stumps after tree removal.

Local stump removal specialists serve neighborhoods throughout ${cityName}, including ${neighborhoodList}, offering comprehensive grinding and removal services. These professionals provide free estimates and can typically complete residential jobs within a few hours, restoring your landscape quickly and efficiently.

The stump grinding process removes the visible portion of the stump and grinds it several inches below the surface. This is the preferred method in ${cityName} because it's cost-effective, minimally invasive, and allows for immediate landscaping. Complete stump removal, while more expensive, may be necessary for construction projects or when replanting trees in the same location.

Thanks to ${climateNote}, tree service professionals in ${cityName} operate year-round to meet community needs. They utilize industry-standard equipment and follow safety protocols to protect your property during the removal process. Interestingly, ${funFact}.`,

    // Variation C (cities 19-27)
    `${cityName} property owners trust local stump removal experts to eliminate hazardous stumps and restore their landscapes. As part of ${countyName}, ${cityName} is ${treeFacts}, creating ongoing demand for professional tree care and stump removal services.

Whether you're in ${neighborhoodList} or elsewhere in ${cityName}, professional stump grinders can quickly remove unsightly stumps from your yard. These licensed contractors offer free consultations and competitive pricing, making it easy to compare options and find the right service for your needs.

Stump grinding remains the go-to solution for most ${cityName} homeowners. The process uses powerful machinery to chip away at the stump, reducing it to mulch-like wood chips that can be removed or used in your garden. This approach is significantly faster and more affordable than digging out the entire root ball, though full removal may be required for specific projects.

The advantage of ${climateNote} means ${cityName} residents can schedule stump removal any time of year. Local companies bring professional-grade equipment and expertise to every job, ensuring safe, efficient results. It's worth noting that ${funFact}.`,
  ];

  // Rotate through variations based on city position to ensure uniqueness
  const index = neighborhoods[0].length % 3; // Simple distribution method
  return variations[index];
}

/**
 * Helper to generate FAQ schema markup
 */
export function generateFAQSchema(faqs: CityFAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
