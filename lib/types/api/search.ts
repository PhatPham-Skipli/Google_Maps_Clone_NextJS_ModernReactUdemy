export interface SearchData {
  type: string;
  licence: string;
  features: FeatureData[];
}

interface FeatureData {
  type: string;
  properties: Properties;
  bbox: number[];
  geometry: GeometryData;
}

interface GeometryData {
  type: string;
  coordinates: number[];
}

interface Properties {
  place_id: number;
  osm_type: string;
  osm_id: number;
  place_rank: number;
  category: string;
  type: string;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: AddressData;
}

interface AddressData {
  city?: string;
  state: string;
  'ISO3166-2-lvl4': string;
  country: string;
  country_code: string;
}
