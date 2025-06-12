import classNames from "classnames";
import { ChevronDown, SearchIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { PricingChart } from "~/components/PricingChart";
import { StickyLogo } from "~/components/StickyLogo";
import { type ApartmentType, unitSpecs } from "~/config";
import { type City, cities } from "~/data/cities";

type Section = "where" | "what" | "when";

export function BookingFormScreen() {
  const [expandedSection, setExpandedSection] = useState<Section>("where");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedType, setSelectedType] = useState<ApartmentType | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Can't use autoFocus because it causes the screen to jump
  useEffect(() => {
    const timer = setTimeout(() => {
      if (expandedSection === "where" && inputRef.current) {
        inputRef.current.focus();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [expandedSection]);

  const filteredCities = useMemo(() => {
    if (!searchQuery.trim()) return cities.slice(0, 9);

    return cities.filter(
      (city) =>
        city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.country.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const handleSectionClick = (section: Section) => {
    setExpandedSection(section);
  };

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setSearchQuery(city.name);
    setExpandedSection("what");
  };

  const handleTypeSelect = (type: ApartmentType) => {
    setSelectedType(type);
    setExpandedSection("when");
  };

  return (
    <div className="flex h-full flex-col">
      <StickyLogo />

      <div className="flex flex-1 flex-col gap-4 overflow-hidden bg-base-200 p-4">
        <SectionCard
          title="Where"
          value={
            selectedCity
              ? `${selectedCity.name}, ${selectedCity.country}`
              : "Flexible"
          }
          isExpanded={expandedSection === "where"}
          onClick={() => handleSectionClick("where")}
        >
          <label className="input mb-2 rounded-full">
            <SearchIcon className="h-4 w-4" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search cities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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

        <SectionCard
          title="What"
          value={selectedType ? unitSpecs[selectedType].name : "Choose type"}
          isExpanded={expandedSection === "what"}
          onClick={() => handleSectionClick("what")}
        >
          <div className="flex flex-1 flex-col gap-2">
            {Object.entries(unitSpecs).map(([type, spec]) => (
              <button
                key={type}
                onClick={() => handleTypeSelect(type as ApartmentType)}
                className={classNames(
                  "btn justify-between",
                  type === selectedType && "btn-active",
                )}
              >
                <span>{spec.name}</span>
                <span className="text-sm font-light opacity-60">
                  {spec.sqm} m²
                </span>
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="When"
          value="Add dates"
          isExpanded={expandedSection === "when"}
          onClick={() => handleSectionClick("when")}
        >
          <div className="flex flex-1 flex-col gap-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="label">
                  <span className="label-text text-xs">Check-in</span>
                </label>
                <input type="date" className="input-bordered input w-full" />
              </div>
              <div>
                <label className="label">
                  <span className="label-text text-xs">Check-out</span>
                </label>
                <input type="date" className="input-bordered input w-full" />
              </div>
            </div>
            <div className="">
              <PricingChart
                maxPrice={unitSpecs[selectedType ?? "economy"].monthlyRent[1]}
                minPrice={unitSpecs[selectedType ?? "economy"].monthlyRent[0]}
              />
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

type SectionCardProps = {
  title: string;
  value: string;
  isExpanded: boolean;
  onClick: () => void;
  children?: React.ReactNode;
};

function SectionCard({
  title,
  value,
  isExpanded,
  onClick,
  children,
}: SectionCardProps) {
  return (
    <div
      className={classNames(
        "rounded-box border-2 bg-base-100 shadow-lg transition-all duration-200",
        isExpanded ? "flex-1 border-primary" : "border-transparent",
      )}
    >
      <button
        onClick={onClick}
        className={classNames(
          "flex w-full cursor-pointer items-center justify-between p-4",
        )}
      >
        <div
          className={classNames(
            "transition-all duration-200",
            isExpanded
              ? "text-lg text-primary"
              : "text-sm text-base-content/50",
          )}
        >
          {title}
        </div>
        <div className="flex items-center gap-2">
          <div
            className={classNames(
              "text-sm transition-all duration-200",
              isExpanded ? "text-primary" : "text-base-content",
            )}
          >
            {value}
          </div>
          <ChevronDown
            className={classNames(
              "h-4 w-4 transition-all duration-200",
              isExpanded ? "rotate-180 text-primary" : "text-base-content/60",
            )}
          />
        </div>
      </button>
      <div className={classNames("h-full p-4 pt-0", !isExpanded && "hidden")}>
        {children}
      </div>
    </div>
  );
}
