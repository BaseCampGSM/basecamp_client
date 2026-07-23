import type { Coordinates } from "@/shared/lib/geolocation";

// 서울시청 좌표 — 사용자가 위치를 아직 지정하지 않았을 때의 지도 기본 중심점
export const DEFAULT_MAP_CENTER: Coordinates = {
  lat: 37.5665,
  lng: 126.978,
};

export const URGENCY_LABEL: Record<string, string> = {
  LOW: "낮음",
  MEDIUM: "보통",
  HIGH: "긴급",
};
