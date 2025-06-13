import { useAtom } from "jotai";

import { ApartmentTypeCard } from "./ApartmentTypeCard";
import { SectionCard } from "./SectionCard";
import { apartmentTypeAtom, currentSectionAtom } from "./store";
import { type ApartmentType, unitSpecs } from "~/config";

export function WhatSection() {
  const [selectedType, setSelectedType] = useAtom(apartmentTypeAtom);
  const [, setCurrentSection] = useAtom(currentSectionAtom);

  const spec = selectedType ? unitSpecs[selectedType] : null;

  const handleTypeSelect = (type: ApartmentType) => {
    setSelectedType(type);
    setCurrentSection("when");
  };

  return (
    <SectionCard section="what" title="What" value={spec?.name || "Select"}>
      <div className="grid h-full grid-cols-2 gap-3">
        {Object.entries(unitSpecs).map(([type, spec]) => (
          <ApartmentTypeCard
            key={type}
            type={type as ApartmentType}
            spec={spec}
            isSelected={type === selectedType}
            onSelect={handleTypeSelect}
          />
        ))}
      </div>
    </SectionCard>
  );
}
