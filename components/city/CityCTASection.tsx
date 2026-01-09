import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CityCTASectionProps {
  cityName: string;
}

export default function CityCTASection({ cityName }: CityCTASectionProps) {
  return (
    <section className="bg-primary py-16 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Get Free Quotes from {cityName} Stump Removal Experts
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90 mb-8">
          Compare local professionals, read reviews, and find the perfect stump removal service for your property. All listings are verified and ready to provide free quotes.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="#businesses">
            <Button
              size="lg"
              className="bg-accent text-white hover:bg-accent/90"
            >
              View Local Businesses
            </Button>
          </Link>
          <Link href="/claim">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              List Your Business
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
