import type { LucideIcon } from "lucide-react";
import {
  BedDoubleIcon,
  BedSingleIcon,
  CrownIcon,
  LayersIcon,
} from "lucide-react";

export type ApartmentType = "economy" | "premium" | "business" | "first";

export type UnitSpec = {
  name: string;
  tagline: string;
  monthlyRent: [number, number]; // [max, min]
  sqm: number;
  icon: LucideIcon;
};

export const unitSpecs: Record<ApartmentType, UnitSpec> = {
  economy: {
    name: "Economy",
    tagline: "Smart and affordable",
    monthlyRent: [1100, 770],
    sqm: 20,
    icon: BedSingleIcon,
  },
  premium: {
    name: "Premium",
    tagline: "Spacious comfort",
    monthlyRent: [1650, 1155],
    sqm: 30,
    icon: BedDoubleIcon,
  },
  business: {
    name: "Business",
    tagline: "Elegant design",
    monthlyRent: [2150, 1505],
    sqm: 30,
    icon: LayersIcon,
  },
  first: {
    name: "First Class",
    tagline: "Luxurious living",
    monthlyRent: [2850, 1995],
    sqm: 40,
    icon: CrownIcon,
  },
};

export type DurationType = "short" | "long";

export type Booking = {
  type: ApartmentType;
  duration: DurationType;
  months: number;
  monthlyRent: number;
};

export const currentBooking: Booking = {
  type: "economy",
  duration: "long",
  months: 6,
  monthlyRent: 950,
};

export type ServiceType = "gym" | "spa" | "coworking";

export type Service = {
  name: string;
  monthlyPrice: number;
  dailyPrice: number;
};

export const serviceSpecs: Record<ServiceType, Service> = {
  gym: {
    name: "Gym",
    monthlyPrice: 40,
    dailyPrice: 12,
  },
  spa: {
    name: "Spa",
    monthlyPrice: 50,
    dailyPrice: 15,
  },
  coworking: {
    name: "Coworking",
    monthlyPrice: 100,
    dailyPrice: 10,
  },
};
