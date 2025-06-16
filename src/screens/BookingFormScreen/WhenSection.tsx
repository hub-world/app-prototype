import { addMonths, format, isThisYear } from "date-fns";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { ChevronsDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { type DateRange, DayPicker } from "react-day-picker";

import { SectionCard } from "./SectionCard";
import {
  type WhenStep,
  apartmentTypeAtom,
  datesAtom,
  durationTypeAtom,
  monthsAtom,
  whenStepAtom,
} from "./store";
import { PricingChart } from "~/components/PricingChart";
import { type DurationType, unitSpecs } from "~/config";

const formatDateRange = (from: Date, to: Date) => {
  const fromFormat = isThisYear(from) ? "d MMM" : "d MMM yyyy";
  const toFormat = isThisYear(to) ? "d MMM" : "d MMM yyyy";
  return `${format(from, fromFormat)} - ${format(to, toFormat)}`;
};

export function WhenSection() {
  const [step, setStep] = useAtom(whenStepAtom);
  const dates = useAtomValue(datesAtom);

  return (
    <SectionCard
      section="when"
      title="When"
      value={dates ? formatDateRange(dates.from, dates.to) : "Add dates"}
    >
      {step === "type" && <StepType setStep={setStep} />}
      {step === "months" && <StepMonths />}
      {step === "dates" && <StepDates />}
    </SectionCard>
  );
}

type StepProps = {
  setStep: (step: WhenStep) => void;
};

export function StepType({ setStep }: StepProps) {
  const setDurationType = useSetAtom(durationTypeAtom);

  const handleSelect = (type: DurationType) => {
    setDurationType(type);
    setStep(type === "long" ? "months" : "dates");
  };

  type CardProps = {
    title: string;
    type: DurationType;
    description: string;
  };

  const Card = ({ title, type, description }: CardProps) => (
    <button
      className="card cursor-pointer bg-primary/10 shadow-sm hover:scale-98"
      onClick={() => handleSelect(type)}
    >
      <div className="card-body flex w-full flex-col items-center justify-center gap-2">
        <div className="text-lg font-medium">{title}</div>
        <div className="text-sm opacity-60">{description}</div>
      </div>
    </button>
  );

  return (
    <div className="-mt-4 flex h-full flex-col justify-center">
      <Card
        type="short"
        title="Short Stay"
        description="Daily rates with full service"
      />
      <div className="divider">or</div>
      <Card type="long" title="Long Stay" description="Stay a month or more" />
    </div>
  );
}

export function StepMonths() {
  const setStep = useSetAtom(whenStepAtom);
  const [, setMonths] = useAtom(monthsAtom);
  const apartmentType = useAtomValue(apartmentTypeAtom);
  const spec = unitSpecs[apartmentType ?? "economy"];

  return (
    <div className="-mt-2 flex h-full flex-col justify-center">
      <PricingChart
        maxPrice={spec.monthlyRent[0]}
        minPrice={spec.monthlyRent[1]}
        onSelect={setMonths}
      />

      <button className="btn mt-4 btn-primary" onClick={() => setStep("dates")}>
        Next
      </button>
    </div>
  );
}

export function StepDates() {
  const durationType = useAtomValue(durationTypeAtom);
  const months = useAtomValue(monthsAtom);
  const [dates, setDates] = useAtom(datesAtom);
  const [range, setRange] = useState<DateRange>();

  const handleSelect = (selected: DateRange | undefined) => {
    if (months && selected?.from && !selected?.to) {
      selected.to = addMonths(selected.from, months);
    }

    if (selected?.from && selected?.to) {
      setDates({ from: selected.from, to: selected.to });
    } else {
      setRange(selected);
    }
  };

  useEffect(() => {
    setRange({ from: dates?.from, to: dates?.to });
  }, [dates]);

  return (
    <div className="relative h-[350px] overflow-auto">
      <DayPicker
        mode="range"
        numberOfMonths={12}
        navLayout="around"
        hideNavigation
        startMonth={new Date()}
        weekStartsOn={1}
        min={durationType === "long" ? 30 : 1}
        disabled={{ before: new Date() }}
        selected={range}
        onSelect={handleSelect}
      />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <ChevronsDownIcon className="h-5 w-5" />
      </div>
    </div>
  );
}
