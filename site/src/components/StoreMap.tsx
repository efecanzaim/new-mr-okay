"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Next.js
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export interface StoreLocation {
  id: string;
  name: string;
  type: "physical" | "marketplace";
  city: string;
  district?: string;
  address: string;
  coordinates: [number, number];
  phone?: string;
  workingHours?: string;
  marketplaceUrl?: string;
  logo?: string;
}

interface StoreMapProps {
  stores: StoreLocation[];
  selectedStore: StoreLocation | null;
  onStoreSelect: (store: StoreLocation) => void;
}

// Component to handle map view changes
function MapController({ selectedStore }: { selectedStore: StoreLocation | null }) {
  const map = useMap();

  useEffect(() => {
    if (selectedStore) {
      map.flyTo(selectedStore.coordinates, 14, {
        duration: 1.5,
      });
    }
  }, [selectedStore, map]);

  return null;
}

export default function StoreMap({ stores, selectedStore, onStoreSelect }: StoreMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-black/20 border-t-black rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-stone-500 tracking-wide">Harita yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Center of Turkey
  const defaultCenter: [number, number] = [39.0, 35.0];
  const defaultZoom = 6;

  return (
    <MapContainer
      center={selectedStore?.coordinates || defaultCenter}
      zoom={selectedStore ? 14 : defaultZoom}
      className="w-full h-full"
      style={{ background: "#f5f5f0" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <MapController selectedStore={selectedStore} />
      {stores.map((store) => (
        <Marker
          key={store.id}
          position={store.coordinates}
          icon={customIcon}
          eventHandlers={{
            click: () => onStoreSelect(store),
          }}
        >
          <Popup className="store-popup">
            <div className="p-2 min-w-[200px]">
              <h3 className="font-semibold text-black text-sm mb-1">{store.name}</h3>
              <p className="text-xs text-stone-600 mb-2">{store.address}</p>
              {store.phone && (
                <p className="text-xs text-stone-500">
                  <span className="font-medium">Tel:</span> {store.phone}
                </p>
              )}
              {store.workingHours && (
                <p className="text-xs text-stone-500">
                  <span className="font-medium">Saat:</span> {store.workingHours}
                </p>
              )}
              {store.marketplaceUrl && (
                <a
                  href={store.marketplaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-xs text-black underline hover:no-underline"
                >
                  Mağazaya Git →
                </a>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
