"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, Tooltip, useMapEvents } from "react-leaflet";

type StudioLocationMapProps = {
  lat: number;
  lng: number;
  label: string;
  subtitle: string;
  mapsUrl: string;
};

export function StudioLocationMap({ lat, lng, label, subtitle, mapsUrl }: StudioLocationMapProps) {
  const markerIcon = L.divIcon({
    className: "",
    // Uses the same ring marker language as the Projects map.
    html: '<div class="project-marker studio-marker-pulse"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

  return (
    <div className="h-[260px] w-full bg-[color:var(--color-map-shell)] sm:h-[300px]">
      <MapContainer
        center={[lat, lng]}
        // Tune zoom here for closer/farther city framing.
        zoom={14}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        touchZoom
        zoomControl={false}
        className="h-full w-full"
        preferCanvas
      >
        <MapClickOpen mapsUrl={mapsUrl} />
        <TileLayer
          // Same dark basemap as Projects section.
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; CARTO'
        />
        <Marker
          position={[lat, lng]}
          icon={markerIcon}
          eventHandlers={{
            click: () => window.open(mapsUrl, "_blank", "noopener,noreferrer"),
          }}
        >
          <Tooltip direction="top" offset={[0, -10]} opacity={0.96}>
            <p className="text-[10px] tracking-[0.22em] uppercase">{label} — {subtitle}</p>
          </Tooltip>
        </Marker>
      </MapContainer>
    </div>
  );
}

function MapClickOpen({ mapsUrl }: { mapsUrl: string }) {
  useMapEvents({
    click: () => {
      window.open(mapsUrl, "_blank", "noopener,noreferrer");
    },
  });

  return null;
}
