import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ArrowLeftIcon, MapPinIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { renderToString } from "react-dom/server";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import {
  type City,
  type Location,
  generateRandomLocations,
} from "~/data/cities";

type LocationPopupProps = {
  city: City;
  onClose: () => void;
  onLocationSelect: (location: Location) => void;
  isOpen: boolean;
};

export function LocationPopup({
  city,
  onClose,
  onLocationSelect,
  isOpen,
}: LocationPopupProps) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>(
    city.coordinates,
  );
  const [mapZoom, setMapZoom] = useState(12);

  useEffect(() => {
    const generatedLocations = generateRandomLocations(city);
    setLocations(generatedLocations);
  }, [city]);

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
    setMapCenter(location.coordinates);
    setMapZoom(15);
  };

  const handleConfirmLocation = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation);
    }
  };

  const handleBackToList = () => {
    setSelectedLocation(null);
    setMapCenter(city.coordinates);
    setMapZoom(12);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute inset-0 z-50 flex flex-col bg-base-100"
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <LocationPopupHeader
            selectedLocation={selectedLocation}
            city={city}
            onBackToList={handleBackToList}
            onClose={onClose}
          />

          <div className="flex flex-1 flex-col overflow-hidden">
            <LocationMap
              city={city}
              locations={locations}
              selectedLocation={selectedLocation}
              hoveredLocation={hoveredLocation}
              mapCenter={mapCenter}
              mapZoom={mapZoom}
              onLocationClick={handleLocationClick}
              onLocationHover={setHoveredLocation}
            />

            <div className="flex-1 overflow-y-auto p-4">
              {selectedLocation ? (
                <LocationDetails
                  location={selectedLocation}
                  city={city}
                  onConfirm={handleConfirmLocation}
                />
              ) : (
                <LocationList
                  locations={locations}
                  hoveredLocation={hoveredLocation}
                  onLocationClick={handleLocationClick}
                  onLocationHover={setHoveredLocation}
                />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const createMapPinMarker = (
  size: number = 24,
  isHighlighted: boolean = false,
) => {
  const mapPinHtml = renderToString(
    <MapPinIcon
      size={size}
      className={classNames(
        isHighlighted
          ? "fill-primary text-white"
          : "fill-base-200 text-primary",
      )}
    />,
  );

  return new L.DivIcon({
    html: mapPinHtml,
    className: "map-pin-icon",
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
};

const normalMapPinIcon = createMapPinMarker(24, false);
const selectedMapPinIcon = createMapPinMarker(32, true);

type LocationPopupHeaderProps = {
  selectedLocation: Location | null;
  city: City;
  onBackToList: () => void;
  onClose: () => void;
};

function LocationPopupHeader({
  selectedLocation,
  city,
  onBackToList,
  onClose,
}: LocationPopupHeaderProps) {
  return (
    <div className="flex flex-shrink-0 items-center justify-between border-b border-base-200 p-4">
      {selectedLocation ? (
        <button onClick={onBackToList} className="btn btn-ghost btn-sm">
          <ArrowLeftIcon className="h-4 w-4" />
        </button>
      ) : (
        <div className="w-8" />
      )}
      <h2 className="text-xl font-semibold">
        {selectedLocation ? selectedLocation.name : city.name}
      </h2>
      <button onClick={onClose} className="btn btn-ghost btn-sm">
        <XIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

type LocationMapProps = {
  city: City;
  locations: Location[];
  selectedLocation: Location | null;
  hoveredLocation: Location | null;
  mapCenter: [number, number];
  mapZoom: number;
  onLocationClick: (location: Location) => void;
  onLocationHover: (location: Location | null) => void;
};

function LocationMap({
  city,
  locations,
  selectedLocation,
  hoveredLocation,
  mapCenter,
  mapZoom,
  onLocationClick,
  onLocationHover,
}: LocationMapProps) {
  return (
    <div
      className={classNames(
        "relative flex-shrink-0",
        selectedLocation ? "h-[42.5%]" : "h-1/2",
      )}
    >
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        className="h-full w-full"
        key={`${mapCenter[0]}-${mapCenter[1]}-${mapZoom}`}
        maxBounds={[
          [city.coordinates[0] - 0.05, city.coordinates[1] - 0.05],
          [city.coordinates[0] + 0.05, city.coordinates[1] + 0.05],
        ]}
        minZoom={11}
        maxZoom={16}
      >
        <TileLayer
          attribution=""
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          maxZoom={16}
        />
        {locations.map((location) => {
          const isHighlighted =
            selectedLocation?.id === location.id ||
            hoveredLocation?.id === location.id;

          return (
            <Marker
              key={location.id}
              position={location.coordinates}
              icon={isHighlighted ? selectedMapPinIcon : normalMapPinIcon}
              eventHandlers={{
                click: () => onLocationClick(location),
                mouseover: () => {
                  onLocationHover(location);
                  // Scroll list item into view in the center
                  const listItem = document.getElementById(
                    `location-${location.id}`,
                  );
                  if (listItem) {
                    listItem.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }
                },
                mouseout: () => onLocationHover(null),
              }}
            />
          );
        })}
      </MapContainer>
    </div>
  );
}

interface LocationDetailsProps {
  location: Location;
  city: City;
  onConfirm: () => void;
}

function LocationDetails({ location, city, onConfirm }: LocationDetailsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">{location.name}</h3>
          <p className="text-base-content/60">{city.name}</p>
        </div>
      </div>

      <p className="text-base-content/80">{location.description}</p>

      <div>
        <h4 className="mb-2 font-semibold">Amenities</h4>
        <div className="flex flex-wrap gap-2">
          {location.amenities.map((amenity) => (
            <span
              key={amenity}
              className="rounded-full bg-base-200 px-3 py-1 text-sm"
            >
              {amenity}
            </span>
          ))}
        </div>
      </div>

      <button onClick={onConfirm} className="btn mt-4 w-full btn-primary">
        Select This Location
      </button>
    </div>
  );
}

interface LocationListProps {
  locations: Location[];
  hoveredLocation: Location | null;
  onLocationClick: (location: Location) => void;
  onLocationHover: (location: Location | null) => void;
}

function LocationList({
  locations,
  hoveredLocation,
  onLocationClick,
  onLocationHover,
}: LocationListProps) {
  return (
    <div className="space-y-3">
      {locations.map((location) => {
        const isHovered = hoveredLocation?.id === location.id;
        return (
          <button
            key={location.id}
            id={`location-${location.id}`}
            onClick={() => onLocationClick(location)}
            onMouseEnter={() => onLocationHover(location)}
            onMouseLeave={() => onLocationHover(null)}
            className={classNames(
              "w-full cursor-pointer rounded-box border-2 border-transparent p-4 text-left transition-colors",
              isHovered
                ? "!border-primary bg-primary/10"
                : "bg-base-200 hover:bg-base-300",
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold">{location.name}</h4>
                <p className="mt-1 text-sm text-base-content/70">
                  {location.description}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
