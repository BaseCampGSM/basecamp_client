export {};

declare global {
  interface Window {
    kakao: typeof kakao;
  }

  namespace kakao.maps {
    class LatLng {
      constructor(lat: number, lng: number);
      getLat(): number;
      getLng(): number;
    }

    interface MapOptions {
      center: LatLng;
      level?: number;
    }

    class Map {
      constructor(container: HTMLElement, options: MapOptions);
      setCenter(latlng: LatLng): void;
      getCenter(): LatLng;
      setLevel(level: number): void;
      relayout(): void;
    }

    interface MarkerOptions {
      position: LatLng;
      map?: Map;
      draggable?: boolean;
      title?: string;
    }

    class Marker {
      constructor(options: MarkerOptions);
      setMap(map: Map | null): void;
      setPosition(latlng: LatLng): void;
      getPosition(): LatLng;
    }

    interface InfoWindowOptions {
      content?: string;
      removable?: boolean;
    }

    class InfoWindow {
      constructor(options?: InfoWindowOptions);
      open(map: Map, marker?: Marker): void;
      close(): void;
      setContent(content: string): void;
    }

    namespace event {
      function addListener(
        target: object,
        type: string,
        handler: (...args: never[]) => void
      ): void;
      function removeListener(
        target: object,
        type: string,
        handler: (...args: never[]) => void
      ): void;
    }

    function load(callback: () => void): void;

    namespace services {
      type Status = "OK" | "ZERO_RESULT" | "ERROR";

      interface AddressSearchResult {
        address_name: string;
        x: string;
        y: string;
      }

      interface AddressInfo {
        address_name: string;
      }

      interface Coord2AddressResult {
        address: AddressInfo | null;
        road_address: AddressInfo | null;
      }

      interface PlacesSearchResult {
        place_name: string;
        address_name: string;
        road_address_name: string;
        x: string;
        y: string;
        category_name: string;
      }

      class Geocoder {
        addressSearch(
          address: string,
          callback: (result: AddressSearchResult[], status: Status) => void
        ): void;
        coord2Address(
          lng: number,
          lat: number,
          callback: (result: Coord2AddressResult[], status: Status) => void
        ): void;
      }

      class Places {
        keywordSearch(
          keyword: string,
          callback: (result: PlacesSearchResult[], status: Status) => void,
          options?: { location?: LatLng; radius?: number }
        ): void;
      }
    }
  }
}
