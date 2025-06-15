export type City = {
  name: string;
  country: string;
  coordinates: [number, number]; // [latitude, longitude]
};

export type Location = {
  id: string;
  name: string;
  description: string;
  coordinates: [number, number];
  amenities: string[];
};

export const cities: City[] = [
  {
    name: "London",
    country: "United Kingdom",
    coordinates: [51.5074, -0.1278],
  },
  {
    name: "Paris",
    country: "France",
    coordinates: [48.8566, 2.3522],
  },
  {
    name: "Berlin",
    country: "Germany",
    coordinates: [52.52, 13.405],
  },
  {
    name: "Madrid",
    country: "Spain",
    coordinates: [40.4168, -3.7038],
  },
  {
    name: "Rome",
    country: "Italy",
    coordinates: [41.9028, 12.4964],
  },
  {
    name: "Amsterdam",
    country: "Netherlands",
    coordinates: [52.3676, 4.9041],
  },
  {
    name: "Brussels",
    country: "Belgium",
    coordinates: [50.8503, 4.3517],
  },
  {
    name: "Vienna",
    country: "Austria",
    coordinates: [48.2082, 16.3738],
  },
  {
    name: "Stockholm",
    country: "Sweden",
    coordinates: [59.3293, 18.0686],
  },
  {
    name: "Copenhagen",
    country: "Denmark",
    coordinates: [55.685, 12.5683],
  },
  {
    name: "Munich",
    country: "Germany",
    coordinates: [48.1351, 11.582],
  },
  {
    name: "Milan",
    country: "Italy",
    coordinates: [45.4642, 9.19],
  },
  {
    name: "Barcelona",
    country: "Spain",
    coordinates: [41.3851, 2.1734],
  },
  {
    name: "Frankfurt",
    country: "Germany",
    coordinates: [50.1109, 8.6821],
  },
  {
    name: "Hamburg",
    country: "Germany",
    coordinates: [53.5511, 9.9937],
  },
  {
    name: "Lyon",
    country: "France",
    coordinates: [45.764, 4.8357],
  },
  {
    name: "Manchester",
    country: "United Kingdom",
    coordinates: [53.4808, -2.2426],
  },
  {
    name: "Warsaw",
    country: "Poland",
    coordinates: [52.2297, 21.0122],
  },
  {
    name: "Prague",
    country: "Czech Republic",
    coordinates: [50.0755, 14.4378],
  },
  {
    name: "Budapest",
    country: "Hungary",
    coordinates: [47.4979, 19.0402],
  },
  {
    name: "Athens",
    country: "Greece",
    coordinates: [37.9838, 23.7275],
  },
  {
    name: "Lisbon",
    country: "Portugal",
    coordinates: [38.7223, -9.1393],
  },
  {
    name: "Dublin",
    country: "Ireland",
    coordinates: [53.3498, -6.2603],
  },
  {
    name: "Zürich",
    country: "Switzerland",
    coordinates: [47.3769, 8.5417],
  },
  {
    name: "Oslo",
    country: "Norway",
    coordinates: [59.9139, 10.7522],
  },
  {
    name: "Helsinki",
    country: "Finland",
    coordinates: [60.1699, 24.9384],
  },
  {
    name: "Bucharest",
    country: "Romania",
    coordinates: [44.4268, 26.1025],
  },
  {
    name: "Sofia",
    country: "Bulgaria",
    coordinates: [42.6977, 23.3219],
  },
  {
    name: "Bratislava",
    country: "Slovakia",
    coordinates: [48.1486, 17.1077],
  },
  {
    name: "Zagreb",
    country: "Croatia",
    coordinates: [45.815, 15.9819],
  },
  // Additional German cities
  {
    name: "Cologne",
    country: "Germany",
    coordinates: [50.9375, 6.9603],
  },
  {
    name: "Stuttgart",
    country: "Germany",
    coordinates: [48.7758, 9.1829],
  },
  {
    name: "Düsseldorf",
    country: "Germany",
    coordinates: [51.2277, 6.7735],
  },
  {
    name: "Leipzig",
    country: "Germany",
    coordinates: [51.3397, 12.3731],
  },
  {
    name: "Dresden",
    country: "Germany",
    coordinates: [51.0504, 13.7373],
  },
  {
    name: "Bremen",
    country: "Germany",
    coordinates: [53.0793, 8.8017],
  },
  {
    name: "Hannover",
    country: "Germany",
    coordinates: [52.3759, 9.732],
  },
  // Additional Italian cities
  {
    name: "Naples",
    country: "Italy",
    coordinates: [40.8518, 14.2681],
  },
  {
    name: "Turin",
    country: "Italy",
    coordinates: [45.0703, 7.6869],
  },
  {
    name: "Florence",
    country: "Italy",
    coordinates: [43.7696, 11.2558],
  },
  {
    name: "Venice",
    country: "Italy",
    coordinates: [45.4408, 12.3155],
  },
  {
    name: "Bologna",
    country: "Italy",
    coordinates: [44.4949, 11.3426],
  },
  {
    name: "Genoa",
    country: "Italy",
    coordinates: [44.4056, 8.9463],
  },
  {
    name: "Palermo",
    country: "Italy",
    coordinates: [38.1157, 13.3615],
  },
  {
    name: "Bari",
    country: "Italy",
    coordinates: [41.1171, 16.8719],
  },
  // Additional cities from other countries
  {
    name: "Birmingham",
    country: "United Kingdom",
    coordinates: [52.4862, -1.8904],
  },
  {
    name: "Glasgow",
    country: "United Kingdom",
    coordinates: [55.8642, -4.2518],
  },
  {
    name: "Marseille",
    country: "France",
    coordinates: [43.2965, 5.3698],
  },
  {
    name: "Lille",
    country: "France",
    coordinates: [50.6292, 3.0573],
  },
  {
    name: "Valencia",
    country: "Spain",
    coordinates: [39.4699, -0.3763],
  },
  {
    name: "Seville",
    country: "Spain",
    coordinates: [37.3891, -5.9845],
  },
  {
    name: "Rotterdam",
    country: "Netherlands",
    coordinates: [51.9244, 4.4777],
  },
  {
    name: "Utrecht",
    country: "Netherlands",
    coordinates: [52.0907, 5.1214],
  },
  {
    name: "Antwerp",
    country: "Belgium",
    coordinates: [51.2194, 4.4025],
  },
  {
    name: "Ghent",
    country: "Belgium",
    coordinates: [51.0543, 3.7174],
  },
  {
    name: "Porto",
    country: "Portugal",
    coordinates: [41.1579, -8.6291],
  },
  {
    name: "Thessaloniki",
    country: "Greece",
    coordinates: [40.6401, 22.9444],
  },
  {
    name: "Kraków",
    country: "Poland",
    coordinates: [50.0647, 19.945],
  },
  {
    name: "Wrocław",
    country: "Poland",
    coordinates: [51.1079, 17.0385],
  },
  {
    name: "Geneva",
    country: "Switzerland",
    coordinates: [46.2044, 6.1432],
  },
  {
    name: "Basel",
    country: "Switzerland",
    coordinates: [47.5596, 7.5886],
  },
];

const locationNames = [
  "City Center",
  "Downtown District",
  "Historic Quarter",
  "Riverside",
  "Old Town",
  "Business District",
  "Arts Quarter",
  "Marina District",
  "University Area",
  "Park Side",
  "Shopping District",
  "Cultural Center",
  "Waterfront",
  "Modern Quarter",
  "Town Square",
];

const amenityOptions = [
  "High-speed WiFi",
  "Security system",
  "Coworking space",
  "Gym",
  "Spa",
  "Rooftop Terrace",
  "Parking",
  "Cleaning Service",
  "Balcony",
  "Bicycle Rental",
];

const descriptions = [
  "Perfect for business travelers with modern amenities and excellent transport links.",
  "Charming historic building in the heart of the city with authentic local character.",
  "Contemporary space with stunning views and premium facilities for discerning guests.",
  "Cozy and welcoming atmosphere in a vibrant neighborhood close to major attractions.",
  "Luxury accommodation featuring exceptional service and world-class amenities.",
  "Stylish urban retreat offering the perfect blend of comfort and convenience.",
  "Boutique property with unique design and personalized service for memorable stays.",
  "Family-friendly location with spacious accommodations and nearby recreational facilities.",
];

export function generateRandomLocations(
  city: City,
  count: number = 5,
): Location[] {
  const [baseLat, baseLng] = city.coordinates;
  const locations: Location[] = [];

  for (let i = 0; i < count; i++) {
    // Generate coordinates within ~3.5km radius of city center
    const offsetLat = (Math.random() - 0.5) * 0.063; // ~3.5km in latitude
    const offsetLng = (Math.random() - 0.5) * 0.063; // ~3.5km in longitude

    const selectedAmenities = amenityOptions
      .sort(() => Math.random() - 0.5)
      .slice(0, 4 + Math.floor(Math.random() * 3)); // 4-6 amenities

    locations.push({
      id: `${city.name.toLowerCase().replace(/\s+/g, "-")}-${i + 1}`,
      name: locationNames[i % locationNames.length],
      description: descriptions[i % descriptions.length],
      coordinates: [baseLat + offsetLat, baseLng + offsetLng],
      amenities: selectedAmenities,
    });
  }

  return locations;
}
