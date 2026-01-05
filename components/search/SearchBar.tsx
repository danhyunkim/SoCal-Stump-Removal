"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { SOCAL_CITIES } from "@/lib/constants";

export default function SearchBar() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (query) params.set("query", query);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full flex-col gap-3 sm:flex-row"
    >
      <div className="flex-1">
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select a city..." />
          </SelectTrigger>
          <SelectContent>
            {SOCAL_CITIES.map((city) => (
              <SelectItem key={city.value} value={city.label}>
                {city.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Search for services..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-12"
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="h-12 bg-accent hover:bg-accent-dark"
      >
        <Search className="mr-2 h-5 w-5" />
        Search
      </Button>
    </form>
  );
}
