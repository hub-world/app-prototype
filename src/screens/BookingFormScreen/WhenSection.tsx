import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { type DateRange, DayPicker } from "react-day-picker";

import { SectionCard } from "./SectionCard";
import { datesAtom } from "./store";
import { PricingChart } from "~/components/PricingChart";
import { type UnitSpec } from "~/config";

export function WhenSection() {
  return (
    <SectionCard section="when" title="When" value="Add dates">
      <div className="-mt-4">
        <StepDates />
      </div>
    </SectionCard>
  );
}

export function StepDuration() {
  return <div>StepTypeSelection</div>;
}

export function StepMonths({ spec }: { spec: UnitSpec }) {
  return (
    <PricingChart
      maxPrice={spec.monthlyRent[1]}
      minPrice={spec.monthlyRent[0]}
    />
  );
}

export function StepDates() {
  const [dates, setDates] = useAtom(datesAtom);
  const [range, setRange] = useState<DateRange>();

  const handleSelect = (selected: DateRange | undefined) => {
    if (selected?.from && selected?.to) {
      setDates([selected.from, selected.to]);
    } else {
      setRange(selected);
    }
  };

  useEffect(() => {
    setRange({
      from: dates?.[0],
      to: dates?.[1],
    });
  }, [dates]);

  return (
    <div className="h-[350px] overflow-auto">
      <DayPicker
        mode="range"
        numberOfMonths={12}
        navLayout="around"
        hideNavigation
        startMonth={new Date()}
        weekStartsOn={1}
        min={1}
        disabled={{ before: new Date() }}
        selected={range}
        onSelect={handleSelect}
      />
    </div>
  );
}
