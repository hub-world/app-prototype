import { atom } from "jotai";
import { atomWithReset, useResetAtom } from "jotai/utils";

import type { ApartmentType, DurationType } from "~/config";
import { type City } from "~/data/cities";

export const cityAtom = atomWithReset<City | null>(null);
export const apartmentTypeAtom = atomWithReset<ApartmentType | null>(null);
export const durationTypeAtom = atomWithReset<DurationType | null>(null);
export const datesAtom = atomWithReset<[Date, Date] | null>(null);

export type Section = "where" | "what" | "when";
export const currentSectionAtom = atomWithReset<Section>("where");

export const isFormCompleteAtom = atom(
  (get) =>
    get(cityAtom) &&
    get(apartmentTypeAtom) &&
    get(durationTypeAtom) &&
    get(datesAtom),
);

export const useResetForm = () => {
  const resetCurrentSection = useResetAtom(currentSectionAtom);
  const resetCity = useResetAtom(cityAtom);
  const resetApartmentType = useResetAtom(apartmentTypeAtom);
  const resetDurationType = useResetAtom(durationTypeAtom);
  const resetDates = useResetAtom(datesAtom);

  return () => {
    resetCurrentSection();
    resetCity();
    resetApartmentType();
    resetDurationType();
    resetDates();
  };
};
