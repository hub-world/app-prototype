import { type ApartmentType, unitSpecs } from "~/config";
import { ApartmentTypeCard } from "./ApartmentTypeCard";

type WhatSectionProps = {
  selectedType: ApartmentType | null;
  onTypeSelect: (type: ApartmentType) => void;
};

export function WhatSection({ selectedType, onTypeSelect }: WhatSectionProps) {
  return (
    <div className="grid h-full grid-cols-2 gap-3">
      {Object.entries(unitSpecs).map(([type, spec]) => (
        <ApartmentTypeCard
          key={type}
          type={type as ApartmentType}
          spec={spec}
          isSelected={type === selectedType}
          onSelect={onTypeSelect}
        />
      ))}
    </div>
  );
}