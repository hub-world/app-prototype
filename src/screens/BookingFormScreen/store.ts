import { atom } from "jotai";
import { atomWithReset, useResetAtom } from "jotai/utils";

import type { ApartmentType, DurationType } from "~/config";
import { type City, type Location } from "~/data/cities";

export const cityAtom = atomWithReset<City | null>(null);
export const locationAtom = atomWithReset<Location | null>(null);
export const apartmentTypeAtom = atomWithReset<ApartmentType | null>(null);
export const durationTypeAtom = atomWithReset<DurationType | null>(null);
export const monthsAtom = atomWithReset<number | null>(null);
export const datesAtom = atomWithReset<{ from: Date; to: Date } | null>(null);

export type Section = "where" | "what" | "when";
export const currentSectionAtom = atomWithReset<Section>("where");

export type WhenStep = "type" | "months" | "dates";
export const whenStepAtom = atomWithReset<WhenStep>("type");

export const isFormCompleteAtom = atom(
  (get) =>
    get(cityAtom) &&
    get(locationAtom) &&
    get(apartmentTypeAtom) &&
    get(durationTypeAtom) &&
    get(datesAtom),
);

export const useResetForm = () => {
  const resetCurrentSection = useResetAtom(currentSectionAtom);
  const resetCity = useResetAtom(cityAtom);
  const resetLocation = useResetAtom(locationAtom);
  const resetApartmentType = useResetAtom(apartmentTypeAtom);
  const resetDurationType = useResetAtom(durationTypeAtom);
  const resetMonths = useResetAtom(monthsAtom);
  const resetDates = useResetAtom(datesAtom);
  const resetWhenStep = useResetAtom(whenStepAtom);

  return () => {
    resetCurrentSection();
    resetCity();
    resetLocation();
    resetApartmentType();
    resetDurationType();
    resetMonths();
    resetDates();
    resetWhenStep();
  };
};
