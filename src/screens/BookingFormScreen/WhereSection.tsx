import { useAtom } from "jotai";
import { SearchIcon, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { SectionCard } from "./SectionCard";
import { cityAtom, currentSectionAtom } from "./store";
import { type City, cities } from "~/data/cities";

export function WhereSection() {
  const [currentSection, setCurrentSection] = useAtom(currentSectionAtom);
  const [selectedCity, setSelectedCity] = useAtom(cityAtom);
  const [searchQuery, setSearchQuery] = useState(selectedCity?.name || "");
  const inputRef = useRef<HTMLInputElement>(null);

  const isExpanded = currentSection === "where";

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isExpanded && inputRef.current) {
        inputRef.current.focus();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [isExpanded]);

  const filteredCities = useMemo(() => {
    if (!searchQuery.trim()) return cities.slice(0, 7);

    return cities.filter(
      (city) =>
        city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.country.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setCurrentSection("what");
  };

  return (
    <SectionCard
      section="where"
      title="Where"
      value={
        selectedCity
          ? `${selectedCity.name}, ${selectedCity.country}`
          : "Flexible"
      }
    >
      <label className="input input-lg mb-2 rounded-full">
        <SearchIcon className="h-4 w-4" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search cities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="btn btn-circle btn-ghost btn-sm"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </label>

      <div className="flex flex-col">
        {filteredCities.length > 0 ? (
          filteredCities.map((city) => (
            <button
              key={`${city.name}-${city.country}`}
              onClick={() => handleCitySelect(city)}
              className="flex cursor-pointer items-center justify-between rounded-field px-4 py-2 text-left hover:bg-base-200"
            >
              <span className="font-medium">{city.name}</span>
              <span className="text-sm text-base-content/60">
                {city.country}
              </span>
            </button>
          ))
        ) : (
          <div className="px-4 py-2 text-base-content/60">
            {searchQuery && "No cities found"}
          </div>
        )}
      </div>
    </SectionCard>
  );
}
