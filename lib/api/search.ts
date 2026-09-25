import { SearchData } from '@/lib/types/api/search';
import { Place } from '@/lib/types/place';

export const search = async (term: string): Promise<Place[]> => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${term}&format=geojson&addressdetails=1&layer=address&limit=10`,
  );

  const data: SearchData = await res.json();

  const places: Place[] = data.features.map((feature) => ({
    id: feature.properties.place_id,
    name: feature.properties.display_name,
    latitude: feature.geometry.coordinates[1],
    longitude: feature.geometry.coordinates[0],
  }));

  return places;
};
