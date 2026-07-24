import { apiFetch } from "@/shared/api/client";
import type { NearbyPlace } from "../model/types";

export function getNearbyPlaces(params: {
  lat: number;
  lng: number;
  category?: string;
}) {
  const search = new URLSearchParams({
    lat: String(params.lat),
    lng: String(params.lng),
  });
  if (params.category) search.set("category", params.category);

  return apiFetch<NearbyPlace[]>(`/api/v1/places/nearby?${search.toString()}`);
}
