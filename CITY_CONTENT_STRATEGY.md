# City Page SEO Content Strategy

**Goal:** Add unique, SEO-optimized content to all 27 SoCal city pages to drive organic traffic.

**Target:** 200-300 words per city + FAQ section

---

## Current State

### What Exists Now:
- ✅ H1: "Tree Stump Removal in [City], California"
- ✅ Basic description (1 sentence)
- ✅ Business listings grid
- ✅ Breadcrumb navigation
- ✅ Search bar

### What's Missing (Critical for SEO):
- ❌ **Unique local content** (200-300 words)
- ❌ **FAQ section** with schema markup
- ❌ **LocalBusiness schema** for each business
- ❌ **Local landmarks/neighborhoods** mentions
- ❌ **Service area information**

---

## Content Structure for Each City Page

### 1. Hero Section (Existing - Keep)
```
H1: Tree Stump Removal in [City], California
Subheading: Find professional stump removal and grinding services...
Search Bar
```

### 2. About Section (NEW - Add Above Business Listings)
```
H2: Professional Stump Removal Services in [City]

[200-300 words unique content including:]
- Why stump removal is important in this specific city
- Local considerations (climate, tree types, soil conditions)
- Mention 2-3 local neighborhoods/areas
- Common reasons residents need stump removal
- Average service area coverage
- Brief mention of local regulations if relevant

Keywords to include naturally:
- "stump removal [city]"
- "stump grinding [city]"
- "tree stump removal near me"
- "[county] stump removal"
- "arborist [city]"
```

### 3. Business Listings Section (Existing - Keep)
```
H2: Top-Rated Stump Removal Services in [City]
[Business cards grid]
```

### 4. FAQ Section (NEW - Add Below Business Listings)
```
H2: Frequently Asked Questions About Stump Removal in [City]

[4-5 FAQs with FAQ schema markup]

Example questions:
- How much does stump removal cost in [City]?
- How long does stump grinding take?
- Do I need a permit for stump removal in [City]?
- What's the difference between stump grinding and stump removal?
- How do I choose a stump removal company in [City]?
```

### 5. CTA Section (NEW - Add at Bottom)
```
H2: Get Free Quotes from Local Stump Removal Experts

[Call-to-action encouraging users to contact businesses]
```

---

## Content Template per City

### Variables Needed:
1. **City name** (e.g., "Anaheim")
2. **County name** (e.g., "Orange County")
3. **Notable neighborhoods** (2-3 per city)
4. **Common tree types** (based on SoCal region)
5. **Local climate note** (optional)

### Sample Content Structure:

```markdown
## Professional Stump Removal Services in [City]

[City] homeowners and property managers rely on professional stump removal services to maintain safe, beautiful outdoor spaces. Located in [County], [City] is home to thousands of mature trees that occasionally need removal, leaving unsightly and hazardous stumps behind.

Our directory connects you with licensed, insured stump removal professionals serving [City] and surrounding areas including [Neighborhood 1], [Neighborhood 2], and [Neighborhood 3]. Whether you need a single stump ground down or multiple stumps removed from your property, local experts can provide free quotes and same-day service.

Stump grinding is the most common method used in [City], which grinds the stump 6-12 inches below ground level, allowing you to replant grass or landscaping. This method is faster, less invasive, and more affordable than complete stump removal. Most residential stump grinding jobs in [City] take 1-3 hours depending on stump size and accessibility.

Local stump removal companies serving [City] are experienced with [common tree type 1], [common tree type 2], and other species common to Southern California. They carry specialized equipment including stump grinders ranging from small walk-behind models for tight spaces to large track-mounted machines for commercial properties.
```

---

## Implementation Plan

### Option 1: Dynamic Content (Recommended for MVP Speed)
**Pros:** Fast to implement, consistent quality, easy to update
**Cons:** Less unique, may be flagged as template content by Google

Create a content generation function:
```typescript
function generateCityContent(city: string, county: string, neighborhoods: string[]) {
  return {
    aboutSection: `...`,
    faqs: [...],
  };
}
```

### Option 2: Static Content Files (Best for SEO)
**Pros:** Truly unique content per city, better for SEO long-term
**Cons:** Time-intensive to write 27 unique pages

Create: `lib/content/cities/[city-slug].ts`
```typescript
export const anaheimContent = {
  about: "...",
  neighborhoods: ["Downtown Anaheim", "Anaheim Hills", "The Platinum Triangle"],
  faqs: [...]
};
```

### Option 3: Hybrid Approach (Balanced) ⭐ RECOMMENDED
**Pros:** Balance of speed and uniqueness
**Cons:** Moderate effort

- Use **template** for structure and common content
- Add **city-specific data** (neighborhoods, facts) in constants
- Use **AI-generated variations** for unique phrasing per city

---

## City-Specific Data Required

### Priority Cities (Top 10 - do these first):
1. **Los Angeles** - Neighborhoods: Hollywood, Downtown LA, Westwood
2. **Long Beach** - Neighborhoods: Belmont Shore, Naples, Bixby Knolls
3. **Anaheim** - Neighborhoods: Anaheim Hills, Downtown Anaheim, Platinum Triangle
4. **Irvine** - Neighborhoods: Woodbridge, University Park, Northwood
5. **San Diego** - Neighborhoods: La Jolla, Gaslamp Quarter, Pacific Beach
6. **Huntington Beach** - Neighborhoods: Downtown HB, Surf City, Sunset Beach
7. **Riverside** - Neighborhoods: Downtown Riverside, Canyon Crest, Mission Grove
8. **Pasadena** - Neighborhoods: Old Pasadena, South Pasadena, East Pasadena
9. **Glendale** - Neighborhoods: Downtown Glendale, Montrose, Verdugo Woodlands
10. **Malibu** - Neighborhoods: Malibu Colony, Point Dume, Carbon Beach

### All 27 Cities:
```typescript
export const CITY_CONTENT_DATA = {
  "los-angeles": {
    neighborhoods: ["Hollywood", "Downtown LA", "Westwood"],
    treeFacts: "home to over 10 million trees",
    climate: "Mediterranean climate with dry summers",
  },
  "anaheim": {
    neighborhoods: ["Anaheim Hills", "Downtown Anaheim", "Platinum Triangle"],
    treeFacts: "known for mature landscaping in residential areas",
    climate: "warm year-round weather perfect for outdoor maintenance",
  },
  // ... add remaining 25 cities
};
```

---

## FAQ Schema Markup

Add structured data for each FAQ:

```typescript
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does stump removal cost in Anaheim?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stump removal in Anaheim typically costs $100-$400 per stump depending on size..."
      }
    }
  ]
};
```

---

## Next Steps

1. ✅ **Create city content data** (lib/content/city-data.ts)
2. ✅ **Build content component** (components/city/CityContent.tsx)
3. ✅ **Add FAQ schema generator** (lib/seo/schema.ts)
4. ✅ **Update city page** to include new sections
5. ✅ **Test on 2-3 cities** before rolling out to all 27
6. ✅ **Build and verify** no errors
7. ✅ **Submit updated sitemap** to Google Search Console

---

## Success Metrics

After implementation:
- [ ] Each city page has 200-300 words of unique content
- [ ] FAQ schema shows in Google Search Console
- [ ] Page word count increases from ~100 to 400+
- [ ] City pages start ranking for "[city] stump removal" keywords
- [ ] Time on page increases (users reading content)

---

**Estimated Time:**
- Option 1 (Dynamic): 2-3 hours
- Option 2 (Static): 10-15 hours
- **Option 3 (Hybrid): 4-6 hours** ⭐ RECOMMENDED

**Priority:** CRITICAL (Week 1-2)
**Depends On:** Real business data (✅ Complete)
**Blocks:** Google Search Console submission, organic traffic

