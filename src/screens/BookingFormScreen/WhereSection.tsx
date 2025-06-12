import { SearchIcon } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { type City, cities } from "~/data/cities";

type WhereSectionProps = {
  selectedCity: City | null;
  searchQuery: string;
  isExpanded: boolean;
  onCitySelect: (city: City) => void;
  onSearchChange: (query: string) => void;
};

export function WhereSection({
  searchQuery,
  isExpanded,
  onCitySelect,
  onSearchChange,
}: WhereSectionProps) {
  const inputRef = useRef<HTMLInputElement>(null);

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

  return (
    <>
      <label className="input mb-2 rounded-full">
        <SearchIcon className="h-4 w-4" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search cities..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </label>

      <div className="flex flex-col">
        {filteredCities.length > 0 ? (
          filteredCities.map((city) => (
            <button
              key={`${city.name}-${city.country}`}
              onClick={() => onCitySelect(city)}
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
    </>
  );
}
