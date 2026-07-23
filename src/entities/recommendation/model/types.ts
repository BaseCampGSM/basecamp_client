export interface Recommendation {
  name: string;
  category: string;
  lat: number;
  lng: number;
  address: string;
  source_url: string;
}

export interface NearbyPlace {
  name: string;
  lat: number;
  lng: number;
  address: string;
  category: string;
}
