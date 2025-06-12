import { atom } from "jotai";

import type { ApartmentType, DurationType } from "~/config";
import { type City } from "~/data/cities";

export const cityAtom = atom<City | null>(null);
export const apartmentTypeAtom = atom<ApartmentType>("economy");
export const durationTypeAtom = atom<DurationType | null>(null);
export const datesAtom = atom<[Date, Date] | null>(null);

export const isFormCompleteAtom = atom(
  (get) =>
    get(cityAtom) &&
    get(apartmentTypeAtom) &&
    get(durationTypeAtom) &&
    get(datesAtom),
);

export type Section = "where" | "what" | "when";
export const currentSectionAtom = atom<Section>("where");
