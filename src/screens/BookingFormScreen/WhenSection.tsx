import { PricingChart } from "~/components/PricingChart";
import { type ApartmentType, unitSpecs } from "~/config";

type WhenSectionProps = {
  selectedType: ApartmentType | null;
  fromDate: string;
  toDate: string;
  onFromDateChange: (date: string) => void;
  onToDateChange: (date: string) => void;
};

export function WhenSection({
  selectedType,
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
}: WhenSectionProps) {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="label">
            <span className="label-text text-xs">Check-in</span>
          </label>
          <input
            type="date"
            className="input-bordered input w-full"
            value={fromDate}
            onChange={(e) => onFromDateChange(e.target.value)}
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text text-xs">Check-out</span>
          </label>
          <input
            type="date"
            className="input-bordered input w-full"
            value={toDate}
            onChange={(e) => onToDateChange(e.target.value)}
          />
        </div>
      </div>
      <div className="">
        <PricingChart
          maxPrice={unitSpecs[selectedType ?? "economy"].monthlyRent[1]}
          minPrice={unitSpecs[selectedType ?? "economy"].monthlyRent[0]}
        />
      </div>
    </div>
  );
}