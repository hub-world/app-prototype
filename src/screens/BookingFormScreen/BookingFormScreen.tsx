import { useState } from "react";
import { StickyLogo } from "~/components/StickyLogo";
import { type ApartmentType, unitSpecs } from "~/config";
import { type City } from "~/data/cities";

import { SectionCard } from "./SectionCard";
import { WhatSection } from "./WhatSection";
import { WhenSection } from "./WhenSection";
import { WhereSection } from "./WhereSection";

type Section = "where" | "what" | "when";

export function BookingFormScreen() {
  const [expandedSection, setExpandedSection] = useState<Section>("when");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedType, setSelectedType] = useState<ApartmentType>("economy");
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

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

  const isFormComplete = selectedCity && selectedType && fromDate && toDate;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <StickyLogo />

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden bg-base-200 p-4">
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
          <WhereSection
            selectedCity={selectedCity}
            searchQuery={searchQuery}
            isExpanded={expandedSection === "where"}
            onCitySelect={handleCitySelect}
            onSearchChange={setSearchQuery}
          />
        </SectionCard>

        <SectionCard
          title="What"
          value={selectedType ? unitSpecs[selectedType].name : "Choose type"}
          isExpanded={expandedSection === "what"}
          onClick={() => handleSectionClick("what")}
        >
          <WhatSection
            selectedType={selectedType}
            onTypeSelect={handleTypeSelect}
          />
        </SectionCard>

        <SectionCard
          title="When"
          value="Add dates"
          isExpanded={expandedSection === "when"}
          onClick={() => handleSectionClick("when")}
        >
          <WhenSection
            selectedType={selectedType}
            fromDate={fromDate}
            toDate={toDate}
            onFromDateChange={setFromDate}
            onToDateChange={setToDate}
          />
        </SectionCard>

        <button
          disabled={!isFormComplete}
          className="btn w-full btn-lg btn-primary"
        >
          Check availability
        </button>
      </div>
    </div>
  );
}
