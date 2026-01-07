import fs from "fs";
import path from "path";
import crypto from "crypto";
import slugify from "slugify";
import { parse } from "csv-parse/sync";
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

// Load .env.local
config({ path: path.resolve(process.cwd(), ".env.local") });

type AnyRow = Record<string, any>;

function die(msg: string): never {
  console.error(msg);
  process.exit(1);
}

function sha1_6(input: string): string {
  return crypto.createHash("sha1").update(input).digest("hex").slice(0, 6);
}

function normalizeWhitespace(s: string) {
  return s.replace(/\s+/g, " ").trim();
}

function normalizeName(name: string): string {
  let s = name.toLowerCase();
  s = s.replace(/[^\p{L}\p{N}\s]/gu, " "); // remove punctuation (unicode-safe)
  s = s.replace(/\b(llc|inc|co|company|corp|corporation|ltd|limited)\b/g, " ");
  return normalizeWhitespace(s);
}

function normalizeAddress(addr: string): string {
  let s = addr.toLowerCase();
  s = s.replace(/[^\p{L}\p{N}\s]/gu, " ");
  return normalizeWhitespace(s);
}

function digitsOnly(s: string): string {
  return (s || "").replace(/\D/g, "");
}

function normalizePhoneDigits(phone: string): string {
  const d = digitsOnly(phone);
  // If US 11-digit starting with 1 => drop leading 1 for phone_norm
  if (d.length === 11 && d.startsWith("1")) return d.slice(1);
  return d;
}

function extractDomain(urlStr: string): string | null {
  try {
    if (!urlStr) return null;
    const u = new URL(urlStr);
    return u.hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return null;
  }
}

function getFirst(row: AnyRow, candidates: string[]): any {
  for (const key of candidates) {
    if (row[key] !== undefined && row[key] !== null && String(row[key]).trim() !== "") {
      return row[key];
    }
  }
  return null;
}

/**
 * Apify exports vary. This helper tries multiple possible header names.
 * First run: it prints headers so you can add/adjust mappings if needed.
 */
function pick(row: AnyRow, keys: string[], fallback: any = null): any {
  const v = getFirst(row, keys);
  return v ?? fallback;
}

function slugFrom(name: string, city: string | null, canonicalKey: string): string {
  const base = [city || "socal", name].filter(Boolean).join(" ");
  const s = slugify(base, { lower: true, strict: true });
  return `${s}-${sha1_6(canonicalKey)}`; // hash ensures uniqueness even for same name/city
}

function computeLegitimacyScore(input: {
  phone_norm?: string | null;
  website_domain?: string | null;
  address?: string | null;
  rating?: number | null;
  review_count?: number | null;
  categories?: string[];
  name?: string;
}): number {
  let score = 0;

  const hasPhone = !!input.phone_norm && input.phone_norm.length >= 10;
  const hasWebsite = !!input.website_domain;
  const hasAddress = !!input.address && input.address.length >= 10;

  if (hasPhone) score += 2;
  if (hasWebsite) score += 1;
  if (hasAddress) score += 1;

  const rating = input.rating ?? null;
  const reviews = input.review_count ?? null;

  if (rating !== null && rating >= 4.0) score += 1;
  if (reviews !== null && reviews >= 5) score += 1;

  const cats = (input.categories || []).map((c) => c.toLowerCase());
  const relevant =
    cats.some((c) => c.includes("tree")) ||
    cats.some((c) => c.includes("stump")) ||
    cats.some((c) => c.includes("arbor")) ||
    cats.some((c) => c.includes("landscap"));
  if (relevant) score += 1;

  // Penalties (simple MVP heuristics)
  const nm = (input.name || "").toLowerCase();
  if (/\b(cheap|best|#1|near me)\b/.test(nm)) score -= 2;
  if (!hasPhone && !hasWebsite) score -= 2;

  // clamp 0-10
  score = Math.max(0, Math.min(10, score));
  return score;
}

function canonicalKey(params: {
  phone_e164?: string | null;
  phone_norm?: string | null;
  source?: string | null;
  source_id?: string | null;
  website_domain?: string | null;
  city?: string | null;
  name_norm?: string | null;
  address_norm?: string | null;
}): string {
  // Best: E.164 if present
  const e164 = params.phone_e164?.trim();
  if (e164) return `phone:${e164}`;

  // Next: normalized digits
  if (params.phone_norm) return `phone_digits:${params.phone_norm}`;

  // Next: source id
  if (params.source && params.source_id) return `${params.source}:${params.source_id}`;

  // Next: website + city
  if (params.website_domain && params.city) return `web:${params.website_domain}:${params.city.toLowerCase()}`;

  // Fallback
  return `nameaddr:${params.name_norm || "na"}:${params.address_norm || "na"}`;
}

// City mapping from lib/constants.ts
const CITY_MAPPING: Record<string, { slug: string; county: string }> = {
  "Los Angeles": { slug: "los-angeles", county: "Los Angeles County" },
  "Long Beach": { slug: "long-beach", county: "Los Angeles County" },
  "Malibu": { slug: "malibu", county: "Los Angeles County" },
  "Anaheim": { slug: "anaheim", county: "Orange County" },
  "Huntington Beach": { slug: "huntington-beach", county: "Orange County" },
  "Irvine": { slug: "irvine", county: "Orange County" },
  "Laguna Beach": { slug: "laguna-beach", county: "Orange County" },
  "Riverside": { slug: "riverside", county: "Riverside County" },
  "San Diego": { slug: "san-diego", county: "San Diego County" },
  "Carlsbad": { slug: "carlsbad", county: "San Diego County" },
  "Pasadena": { slug: "pasadena", county: "Los Angeles County" },
  "Glendale": { slug: "glendale", county: "Los Angeles County" },
  "Torrance": { slug: "torrance", county: "Los Angeles County" },
  "Burbank": { slug: "burbank", county: "Los Angeles County" },
  "Santa Ana": { slug: "santa-ana", county: "Orange County" },
  "Newport Beach": { slug: "newport-beach", county: "Orange County" },
  "Costa Mesa": { slug: "costa-mesa", county: "Orange County" },
  "Chula Vista": { slug: "chula-vista", county: "San Diego County" },
  "Oceanside": { slug: "oceanside", county: "San Diego County" },
  "Escondido": { slug: "escondido", county: "San Diego County" },
  "El Cajon": { slug: "el-cajon", county: "San Diego County" },
  "Temecula": { slug: "temecula", county: "Riverside County" },
  "Murrieta": { slug: "murrieta", county: "Riverside County" },
  "Corona": { slug: "corona", county: "Riverside County" },
  "San Bernardino": { slug: "san-bernardino", county: "San Bernardino County" },
  "Fontana": { slug: "fontana", county: "San Bernardino County" },
  "Rancho Cucamonga": { slug: "rancho-cucamonga", county: "San Bernardino County" },
};

function mapCity(rawCity: string | null): { city: string; county: string | null } {
  if (!rawCity) return { city: "", county: null };

  const mapped = CITY_MAPPING[rawCity];
  if (mapped) {
    return { city: mapped.slug, county: mapped.county };
  }

  // Fallback: slugify the raw city
  return { city: slugify(rawCity, { lower: true, strict: true }), county: null };
}

async function main() {
  const fileArg = process.argv[2];
  if (!fileArg) die("Usage: npm run import:apify -- /path/to/apify.csv");

  const csvPath = path.resolve(process.cwd(), fileArg);
  if (!fs.existsSync(csvPath)) die(`CSV not found at: ${csvPath}`);

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    die("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env.");
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const raw = fs.readFileSync(csvPath, "utf8");
  const rows: AnyRow[] = parse(raw, {
    columns: true,
    skip_empty_lines: true,
    relax_quotes: true,
    relax_column_count: true,
  });

  if (!rows.length) die("CSV parsed but contained 0 rows.");

  // Print headers once (helps if Apify column names differ)
  const headers = Object.keys(rows[0] || {});
  console.log(`Parsed ${rows.length} rows.`);
  console.log("Detected headers:", headers.slice(0, 30), headers.length > 30 ? `... (+${headers.length - 30})` : "");

  // Normalize → in-batch dedupe
  const uniqueByCanonical = new Map<string, any>();
  const possibleDupes: Array<{ reason: string; a: any; b: any }> = [];

  for (const r of rows) {
    // Try common Apify/Maps header variants
    const name = String(pick(r, ["title", "name", "businessName", "Company", "placeName"], "") || "").trim();
    if (!name) continue;

    const rawCity = pick(r, ["city"], null);
    const { city, county } = mapCity(rawCity);

    const address = pick(r, ["address", "fullAddress", "streetAddress"], null);
    const zip_code = pick(r, ["postalCode", "zip", "zip_code"], null);

    const phone_e164 = pick(r, ["phoneUnformatted", "phone_e164", "phoneE164"], null);
    const phone_display = pick(r, ["phone", "phoneFormatted"], null);

    const website = pick(r, ["website", "url", "websiteUrl"], null);

    const source_id = pick(r, ["placeId", "place_id"], null);

    const lat = pick(r, ["latitude", "lat"], null);
    const lng = pick(r, ["longitude", "lng"], null);

    const ratingRaw = pick(r, ["rating"], null);
    const reviewsRaw = pick(r, ["reviewsCount", "reviewCount", "review_count"], null);

    const rating = ratingRaw !== null ? Number(ratingRaw) : null;
    const review_count = reviewsRaw !== null ? Number(reviewsRaw) : null;

    // categories may be a single field or multiple
    const category1 = pick(r, ["categoryName", "category", "primaryCategory"], null);
    const categories = category1 ? [String(category1)] : [];

    const name_norm = normalizeName(name);
    const address_norm = address ? normalizeAddress(String(address)) : null;

    const phone_norm = phone_e164
      ? normalizePhoneDigits(String(phone_e164))
      : phone_display
      ? normalizePhoneDigits(String(phone_display))
      : null;

    const website_domain = website ? extractDomain(String(website)) : null;

    const ck = canonicalKey({
      phone_e164: phone_e164 ? String(phone_e164) : null,
      phone_norm,
      source: "google_maps",
      source_id: source_id ? String(source_id) : null,
      website_domain,
      city: city || null,
      name_norm,
      address_norm: address_norm || null,
    });

    const legitimacy_score = computeLegitimacyScore({
      phone_norm,
      website_domain,
      address: address ? String(address) : null,
      rating,
      review_count,
      categories,
      name,
    });

    const slug = slugFrom(name, city || null, ck);

    const normalized = {
      // your existing businesses columns
      slug,
      name,
      description: null,

      phone: phone_e164 ? String(phone_e164) : phone_display ? String(phone_display) : null,
      email: null,
      website: website ? String(website) : null,

      address: address ? String(address) : null,
      city: city || null,
      county: county || null,
      zip_code: zip_code ? String(zip_code) : null,
      latitude: lat !== null ? Number(lat) : null,
      longitude: lng !== null ? Number(lng) : null,

      service_areas: null,
      is_featured: false,
      is_claimed: false,
      owner_id: null,

      rating,
      review_count,
      price_range: null,
      hours: null, // if you want: parse hours fields later into JSON

      // new columns for import/dedupe mode
      source: "google_maps",
      source_id: source_id ? String(source_id) : null,
      canonical_key: ck,
      name_norm,
      phone_norm,
      website_domain,
      address_norm,
      legitimacy_score,
      raw_data: r,
      last_scraped_at: new Date().toISOString(),
    };

    // Hard dedupe: keep best record for same canonical_key
    const existing = uniqueByCanonical.get(ck);
    if (!existing) {
      uniqueByCanonical.set(ck, normalized);
    } else {
      // pick "winner": higher legitimacy_score, then higher reviews
      const winner =
        (normalized.legitimacy_score ?? 0) > (existing.legitimacy_score ?? 0)
          ? normalized
          : (normalized.legitimacy_score ?? 0) < (existing.legitimacy_score ?? 0)
          ? existing
          : (normalized.review_count ?? 0) > (existing.review_count ?? 0)
          ? normalized
          : existing;

      const loser = winner === normalized ? existing : normalized;
      uniqueByCanonical.set(ck, winner);

      possibleDupes.push({
        reason: "same_canonical_key",
        a: winner,
        b: loser,
      });
    }
  }

  const unique = Array.from(uniqueByCanonical.values());

  // Publish gate (MVP): only upsert score >= 6
  const publishable = unique.filter((b) => (b.legitimacy_score ?? 0) >= 6);

  console.log(`Unique after hard dedupe: ${unique.length}`);
  console.log(`Publishable (score >= 6): ${publishable.length}`);
  console.log(`Dupes flagged (same canonical): ${possibleDupes.length}`);

  // Optional: write reports
  fs.writeFileSync("import_unique.json", JSON.stringify(unique, null, 2));
  fs.writeFileSync("import_publishable.json", JSON.stringify(publishable, null, 2));
  fs.writeFileSync("import_dupes.json", JSON.stringify(possibleDupes, null, 2));
  console.log("Wrote import_unique.json, import_publishable.json, import_dupes.json");

  // Check if canonical_key index exists, if not use slug
  console.log("\nAttempting upsert...");

  // Try with canonical_key first
  let useCanonicalKey = true;
  const testBatch = publishable.slice(0, 1);

  const testResult = await supabase
    .from("businesses")
    .upsert(testBatch, { onConflict: "canonical_key" })
    .select("id");

  if (testResult.error?.code === "42P10") {
    console.log("⚠️  canonical_key index not found, falling back to slug-based upsert");
    useCanonicalKey = false;
  }

  // Upsert in batches
  const BATCH = 200;
  let upserted = 0;

  for (let i = 0; i < publishable.length; i += BATCH) {
    const batch = publishable.slice(i, i + BATCH);

    let error, data;

    if (useCanonicalKey) {
      const result = await supabase
        .from("businesses")
        .upsert(batch, { onConflict: "canonical_key" })
        .select("id");
      error = result.error;
      data = result.data;
    } else {
      // Fallback: upsert using slug
      const result = await supabase
        .from("businesses")
        .upsert(batch, { onConflict: "slug" })
        .select("id");
      error = result.error;
      data = result.data;
    }

    if (error) {
      console.error("Supabase upsert error:", error);
      process.exit(1);
    }

    upserted += data?.length ?? 0;
    console.log(`Upserted batch ${Math.floor(i / BATCH) + 1}: ${data?.length ?? 0} rows`);
  }

  console.log(`\n✅ Done. Total upserted/updated: ${upserted}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
