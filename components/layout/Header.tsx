import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-xl font-bold text-white">SC</span>
            </div>
            <span className="hidden font-bold sm:inline-block">
              SoCal Stump Removal
            </span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="/search"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Find Services
            </Link>
            <Link
              href="/#how-it-works"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              How It Works
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/claim">
            <Button variant="outline" size="sm">
              List Your Business
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="sm" className="bg-primary hover:bg-primary-dark">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
