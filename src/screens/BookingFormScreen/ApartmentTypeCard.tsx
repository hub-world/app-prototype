import classNames from "classnames";
import { ImageIcon } from "lucide-react";

import { Money } from "~/components/Money";
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
          <ImageIcon className="text-base-content/40" />
        </div>

        <div className="text-xs text-base-content/60">
          from{" "}
          <Money
            amount={spec.monthlyRent[1]}
            className="font-semibold text-primary"
          />{" "}
          / month
        </div>
      </div>
    </div>
  );
}
