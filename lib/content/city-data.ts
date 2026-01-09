// City-specific data for SEO content generation
// This provides unique local context for each of the 27 city pages

export interface CityContentData {
  neighborhoods: string[];
  treeFacts?: string;
  climateNote?: string;
  funFact?: string;
}

export const CITY_CONTENT_DATA: Record<string, CityContentData> = {
  "los-angeles": {
    neighborhoods: ["Hollywood", "Downtown LA", "Westwood"],
    treeFacts: "home to over 10 million trees including ficus, palm, and oak varieties",
    climateNote: "Mediterranean climate with mild, wet winters and hot, dry summers",
    funFact: "the urban forest helps reduce temperatures by up to 9°F in summer months",
  },
  "long-beach": {
    neighborhoods: ["Belmont Shore", "Naples", "Bixby Knolls"],
    treeFacts: "known for coastal landscaping with drought-resistant species",
    climateNote: "temperate coastal climate perfect for year-round tree maintenance",
    funFact: "the city's urban canopy covers over 18% of the total area",
  },
  "malibu": {
    neighborhoods: ["Malibu Colony", "Point Dume", "Carbon Beach"],
    treeFacts: "featuring native California sycamore and oak trees",
    climateNote: "coastal climate with ocean breezes and seasonal fire risk",
    funFact: "fire-resistant landscaping is a top priority for property owners",
  },
  "anaheim": {
    neighborhoods: ["Anaheim Hills", "Downtown Anaheim", "Platinum Triangle"],
    treeFacts: "known for mature landscaping in residential areas and commercial properties",
    climateNote: "warm year-round weather perfect for outdoor maintenance",
    funFact: "home to thousands of mature trees requiring professional care",
  },
  "huntington-beach": {
    neighborhoods: ["Downtown HB", "Surf City", "Sunset Beach"],
    treeFacts: "featuring coastal and inland tree species adapted to salt air",
    climateNote: "mild coastal climate with consistent temperatures year-round",
    funFact: "oceanfront properties require specialized tree care due to salt exposure",
  },
  "irvine": {
    neighborhoods: ["Woodbridge", "University Park", "Northwood"],
    treeFacts: "planned community with extensive tree coverage and maintained greenbelts",
    climateNote: "inland Orange County climate with warm summers",
    funFact: "strict HOA guidelines ensure professional tree and landscape maintenance",
  },
  "laguna-beach": {
    neighborhoods: ["Village Laguna", "Top of the World", "Three Arch Bay"],
    treeFacts: "hillside properties with mature trees and canyon vegetation",
    climateNote: "coastal Mediterranean climate with unique microenvironments",
    funFact: "steep terrain often requires specialized equipment for stump removal",
  },
  "riverside": {
    neighborhoods: ["Downtown Riverside", "Canyon Crest", "Mission Grove"],
    treeFacts: "historic citrus groves and diverse urban forest",
    climateNote: "hot inland climate with distinct seasons",
    funFact: "the city is famous for its citrus heritage and tree-lined streets",
  },
  "san-diego": {
    neighborhoods: ["La Jolla", "Gaslamp Quarter", "Pacific Beach"],
    treeFacts: "home to over 200 tree species from around the world",
    climateNote: "near-perfect year-round climate for tree growth",
    funFact: "Balboa Park contains one of the largest urban cultural parks in North America",
  },
  "carlsbad": {
    neighborhoods: ["La Costa", "Aviara", "Village"],
    treeFacts: "coastal and inland microclimates supporting diverse tree species",
    climateNote: "temperate coastal weather with minimal temperature variation",
    funFact: "known for beautiful landscaping in master-planned communities",
  },
  "pasadena": {
    neighborhoods: ["Old Pasadena", "South Lake", "East Pasadena"],
    treeFacts: "historic neighborhoods with century-old oak and sycamore trees",
    climateNote: "warm-summer Mediterranean climate ideal for various tree species",
    funFact: "street trees are protected by city ordinances requiring permits",
  },
  "glendale": {
    neighborhoods: ["Downtown Glendale", "Montrose", "Verdugo Woodlands"],
    treeFacts: "urban forest includes magnolia, jacaranda, and native California species",
    climateNote: "valley climate with hot summers and mild winters",
    funFact: "the city maintains over 30,000 street trees along public rights-of-way",
  },
  "torrance": {
    neighborhoods: ["Old Torrance", "Walteria", "Seaside"],
    treeFacts: "coastal city with mix of ornamental and native tree species",
    climateNote: "moderate coastal climate with marine layer influence",
    funFact: "strict city tree ordinances protect mature trees on private property",
  },
  "burbank": {
    neighborhoods: ["Downtown Burbank", "Magnolia Park", "Rancho Equestrian District"],
    treeFacts: "mature trees in established neighborhoods and commercial areas",
    climateNote: "valley climate with warm summers and occasional Santa Ana winds",
    funFact: "the city's urban forest provides critical shade in the warmer months",
  },
  "santa-ana": {
    neighborhoods: ["Downtown Santa Ana", "Floral Park", "French Park"],
    treeFacts: "diverse urban canopy including palm, ficus, and deciduous species",
    climateNote: "warm Mediterranean climate typical of Orange County",
    funFact: "historic neighborhoods feature mature street trees over 50 years old",
  },
  "newport-beach": {
    neighborhoods: ["Balboa Peninsula", "Corona del Mar", "Newport Coast"],
    treeFacts: "coastal properties with salt-tolerant and ornamental species",
    climateNote: "ideal coastal climate with mild year-round temperatures",
    funFact: "waterfront properties require specialized care due to coastal conditions",
  },
  "costa-mesa": {
    neighborhoods: ["Eastside Costa Mesa", "Mesa Verde", "Westside"],
    treeFacts: "suburban landscaping with diverse tree species",
    climateNote: "coastal-influenced climate with comfortable temperatures",
    funFact: "centrally located in Orange County with excellent service accessibility",
  },
  "chula-vista": {
    neighborhoods: ["Eastlake", "Otay Ranch", "West Chula Vista"],
    treeFacts: "newer developments with planned tree coverage and xeriscaping",
    climateNote: "mild coastal climate with warm, dry summers",
    funFact: "fast-growing city with expanding residential tree canopy",
  },
  "oceanside": {
    neighborhoods: ["Downtown Oceanside", "Loma Alta", "Fire Mountain"],
    treeFacts: "coastal and inland tree varieties adapted to San Diego County climate",
    climateNote: "pleasant coastal weather year-round",
    funFact: "beachfront location with specialized coastal tree species",
  },
  "escondido": {
    neighborhoods: ["Old Escondido", "Felicita", "East Grove"],
    treeFacts: "valley location with avocado groves and native California trees",
    climateNote: "warm inland climate with hot, dry summers",
    funFact: "agricultural heritage means many properties have mature trees",
  },
  "el-cajon": {
    neighborhoods: ["Fletcher Hills", "Granite Hills", "Rancho San Diego"],
    treeFacts: "inland valley with eucalyptus, oak, and ornamental trees",
    climateNote: "Mediterranean climate with hot summers",
    funFact: "the valley location creates unique landscaping needs",
  },
  "temecula": {
    neighborhoods: ["Old Town Temecula", "Harveston", "Redhawk"],
    treeFacts: "wine country with oak trees and vineyard landscaping",
    climateNote: "semi-arid climate with warm days and cool nights",
    funFact: "hillside properties often require specialized tree removal equipment",
  },
  "murrieta": {
    neighborhoods: ["Greer Ranch", "The Village", "Bear Creek"],
    treeFacts: "master-planned communities with managed tree coverage",
    climateNote: "inland Southern California climate with seasonal variation",
    funFact: "newer developments feature drought-tolerant landscaping",
  },
  "corona": {
    neighborhoods: ["South Corona", "Eagle Glen", "Dos Lagos"],
    treeFacts: "suburban tree coverage with mix of native and ornamental species",
    climateNote: "warm inland climate typical of Riverside County",
    funFact: "growing city with expanding tree maintenance needs",
  },
  "san-bernardino": {
    neighborhoods: ["Arrowhead", "Del Rosa", "Muscoy"],
    treeFacts: "valley location with palm, pine, and deciduous tree varieties",
    climateNote: "hot summers and mild winters typical of inland valleys",
    funFact: "proximity to mountains creates unique microclimates",
  },
  "fontana": {
    neighborhoods: ["South Fontana", "Sierra Lakes", "Hunter's Ridge"],
    treeFacts: "suburban landscaping with drought-resistant tree species",
    climateNote: "semi-arid climate with hot, dry summers",
    funFact: "rapidly growing city with increasing tree service demand",
  },
  "rancho-cucamonga": {
    neighborhoods: ["Victoria Gardens", "Alta Loma", "Etiwanda"],
    treeFacts: "foothills location with native oaks and suburban landscaping",
    climateNote: "warm valley climate with mountain views",
    funFact: "elevation changes create diverse landscaping challenges",
  },
};

// FAQ templates with city-specific pricing and info
export interface CityFAQ {
  question: string;
  answer: string;
}

export function generateCityFAQs(cityName: string, countyName: string): CityFAQ[] {
  return [
    {
      question: `How much does stump removal cost in ${cityName}?`,
      answer: `Stump removal in ${cityName} typically costs between $100 and $400 per stump, depending on size, location, and accessibility. Small stumps (under 12 inches) usually cost $100-$150, medium stumps (12-24 inches) run $150-$300, and large stumps (over 24 inches) can cost $300-$400 or more. Most ${countyName} professionals offer free quotes and can provide exact pricing after assessing your specific situation.`,
    },
    {
      question: `What's the difference between stump grinding and stump removal?`,
      answer: `Stump grinding is the most common method in ${cityName}, where a machine grinds the stump 6-12 inches below ground level, leaving wood chips that can be used as mulch. This process is faster, less invasive, and more affordable. Complete stump removal involves extracting the entire root system, which is more expensive and time-consuming but necessary if you're planning construction or need to plant in the same location.`,
    },
    {
      question: `Do I need a permit for stump removal in ${cityName}?`,
      answer: `In most cases, you don't need a permit for stump removal on private property in ${cityName}. However, if the tree is protected by local ordinances, located near property lines, or in a designated conservation area, you may need approval from the city. Always check with ${cityName}'s planning department or consult with a licensed tree service professional to ensure compliance with local regulations.`,
    },
    {
      question: `How long does stump grinding take?`,
      answer: `Most residential stump grinding jobs in ${cityName} take 1-3 hours depending on the size and number of stumps. A single small to medium stump can be ground down in 15-30 minutes, while larger stumps or multiple stumps may take several hours. Professional companies serving ${countyName} have the right equipment to work efficiently while minimizing disruption to your property.`,
    },
    {
      question: `Can I remove a stump myself, or should I hire a professional?`,
      answer: `While DIY stump removal is possible using manual tools or chemical treatments, hiring a professional in ${cityName} is recommended for safety and efficiency. Stump grinders are dangerous without proper training, and manual removal is extremely labor-intensive. Professional services in ${countyName} carry insurance, have specialized equipment, and can complete the job in a fraction of the time while ensuring safe, complete removal.`,
    },
  ];
}
