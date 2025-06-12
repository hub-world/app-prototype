export type ApartmentType = "economy" | "premium" | "business" | "first";

export type UnitSpec = {
  name: string;
  monthlyRent: [number, number]; // [max, min]
  sqm: number;
};

export const unitSpecs: Record<ApartmentType, UnitSpec> = {
  economy: {
    name: "Economy",
    monthlyRent: [1100, 770],
    sqm: 20,
  },
  premium: {
    name: "Premium",
    monthlyRent: [1650, 1155],
    sqm: 30,
  },
  business: {
    name: "Business",
    monthlyRent: [2150, 1505],
    sqm: 30,
  },
  first: {
    name: "First Class",
    monthlyRent: [2850, 1995],
    sqm: 40,
  },
};

export type Booking = {
  type: ApartmentType;
  months: number;
  monthlyRent: number;
};

export const currentBooking: Booking = {
  type: "economy",
  months: 6,
  monthlyRent: 875,
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
