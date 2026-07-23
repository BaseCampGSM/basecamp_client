import type { Coordinates } from "./geolocation";

export interface GeocodedAddress {
  coords: Coordinates;
  address: string;
}

export function searchAddress(query: string): Promise<GeocodedAddress | null> {
  return new Promise((resolve, reject) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(query, (result, status) => {
      if (status === "OK" && result[0]) {
        resolve({
          coords: { lat: Number(result[0].y), lng: Number(result[0].x) },
          address: result[0].address_name,
        });
      } else if (status === "ZERO_RESULT") {
        resolve(null);
      } else {
        reject(new Error("주소 검색에 실패했습니다."));
      }
    });
  });
}

export function reverseGeocode(coords: Coordinates): Promise<string | null> {
  return new Promise((resolve) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.coord2Address(coords.lng, coords.lat, (result, status) => {
      if (status === "OK" && result[0]) {
        resolve(
          result[0].road_address?.address_name ??
            result[0].address?.address_name ??
            null,
        );
      } else {
        resolve(null);
      }
    });
  });
}
