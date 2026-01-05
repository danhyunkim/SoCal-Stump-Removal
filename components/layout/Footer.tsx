import Link from "next/link";
import { SOCAL_CITIES } from "@/lib/constants";

export default function Footer() {
  const popularCities = SOCAL_CITIES.slice(0, 12);

  return (
    <footer className="border-t bg-gray-50">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              SoCal Stump Removal
            </h3>
            <p className="text-sm text-gray-600">
              Find the best tree stump removal services in Southern California.
              Compare local professionals, read reviews, and get free quotes.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">
              Popular Cities
            </h3>
            <ul className="space-y-2 text-sm">
              {popularCities.map((city) => (
                <li key={city.value}>
                  <Link
                    href={`/${city.value}`}
                    className="text-gray-600 hover:text-primary"
                  >
                    {city.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">
              For Businesses
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/claim"
                  className="text-gray-600 hover:text-primary"
                >
                  List Your Business
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-primary"
                >
                  Business Login
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-gray-600 hover:text-primary">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} SoCal Stump Removal Directory.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
