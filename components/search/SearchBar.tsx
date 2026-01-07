"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { CALIFORNIA_CITIES } from "@/lib/california-cities";

export default function SearchBar() {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCity(value);
    setSelectedIndex(-1);

    if (value.trim()) {
      const filtered = CALIFORNIA_CITIES.filter((c) =>
        c.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 8); // Show max 8 suggestions
      setFilteredCities(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredCities([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectCity = (selectedCity: string) => {
    setCity(selectedCity);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || filteredCities.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCities.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelectCity(filteredCities[selectedIndex]);
        } else {
          handleSearch(e as any);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      router.push(`/search?location=${encodeURIComponent(city.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <div className="flex w-full gap-3">
        <div className="relative flex-1">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search by city"
            value={city}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (city.trim() && filteredCities.length > 0) {
                setShowSuggestions(true);
              }
            }}
            className="h-12 pr-4 text-gray-700 placeholder:text-gray-600"
          />

          {/* Autocomplete Suggestions */}
          {showSuggestions && filteredCities.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg max-h-60 overflow-auto"
            >
              {filteredCities.map((suggestedCity, index) => (
                <button
                  key={suggestedCity}
                  type="button"
                  onClick={() => handleSelectCity(suggestedCity)}
                  className={`w-full px-4 py-2 text-left transition-colors text-gray-900 first:rounded-t-md last:rounded-b-md ${
                    index === selectedIndex
                      ? "bg-primary/10 border-l-2 border-primary"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {suggestedCity}
                </button>
              ))}
            </div>
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          className="h-12 bg-accent hover:bg-accent/90"
        >
          <Search className="mr-2 h-5 w-5" />
          Search
        </Button>
      </div>
    </form>
  );
}
