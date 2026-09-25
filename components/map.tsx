'use client';

import { Place } from '@/lib/types/place';
import { useEffect } from 'react';
import { MapContainer, Marker, TileLayer, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Configure default icon to avoid broken marker icon issue in Next.js bundler
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapControllerProps {
  place: Place | null;
}

// Controller component to programmatically pan/fly to selected place
function MapController({ place }: MapControllerProps) {
  const map = useMap();

  useEffect(() => {
    if (place) {
      map.flyTo([place.latitude, place.longitude], 14, {
        duration: 1.5,
      });
    }
  }, [place, map]);

  return null;
}

interface MapProps {
  place: Place | null;
}

export default function Map({ place }: MapProps) {
  const defaultCenter: [number, number] = [21.0285, 105.8542];

  return (
    <MapContainer
      center={place ? [place.latitude, place.longitude] : defaultCenter}
      zoom={12}
      zoomControl={false}
      scrollWheelZoom
      className="h-full w-full"
    >
      <ZoomControl position="bottomright" />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController place={place} />
      {place && (
        <Marker
          position={[place.latitude, place.longitude]}
          icon={defaultIcon}
        />
      )}
    </MapContainer>
  );
}
