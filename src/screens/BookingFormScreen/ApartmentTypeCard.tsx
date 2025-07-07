import classNames from "classnames";

import { type ApartmentType, type UnitSpec } from "~/config";

type ApartmentTypeCardProps = {
  type: ApartmentType;
  spec: UnitSpec;
  isSelected: boolean;
  onSelect: (type: ApartmentType) => void;
};

export function ApartmentTypeCard({
  type,
  spec,
  isSelected,
  onSelect,
}: ApartmentTypeCardProps) {
  const IconComponent = spec.icon;

  return (
    <div
      onClick={() => onSelect(type)}
      className={classNames(
        "card flex cursor-pointer flex-col border-2",
        isSelected ? "border-primary" : "border-base-300",
      )}
    >
      <div className="card-body flex flex-col p-3">
        <div className="flex items-start justify-between">
          <h3 className="card-title text-sm font-semibold">{spec.name}</h3>
          <span className="text-xs text-base-content/60">{spec.sqm} m²</span>
        </div>

        <div className="-mx-3 flex h-16 w-[calc(100%+var(--spacing)*6)] flex-1 items-center justify-center bg-base-200">
          <IconComponent className="h-8 w-8 text-base-content/40" />
        </div>

        <div className="text-xs text-base-content/60">{spec.tagline}</div>
      </div>
    </div>
  );
}
