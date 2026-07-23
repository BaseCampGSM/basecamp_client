"use client";

import { KeyboardEvent, useState } from "react";
import { Button, Input, KakaoMap } from "@/shared/ui";
import { DEFAULT_MAP_CENTER } from "@/shared/config/constants";
import { getCurrentPosition, type Coordinates } from "@/shared/lib/geolocation";
import { reverseGeocode, searchAddress } from "@/shared/lib/kakao-geocoder";
import { useKakaoLoader } from "@/shared/lib/use-kakao-loader";

interface LocationPickerProps {
  coords: Coordinates | null;
  address: string;
  onChange: (coords: Coordinates, address: string) => void;
}

export function LocationPicker({
  coords,
  address,
  onChange,
}: LocationPickerProps) {
  useKakaoLoader();
  const [query, setQuery] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const applyCoords = async (next: Coordinates, fallbackAddress?: string) => {
    const resolvedAddress =
      fallbackAddress ??
      (await reverseGeocode(next)) ??
      "주소를 확인할 수 없습니다";
    onChange(next, resolvedAddress);
  };

  const handleUseCurrentLocation = async () => {
    setError(null);
    setIsBusy(true);
    try {
      const current = await getCurrentPosition();
      await applyCoords(current);
    } catch {
      setError("현재 위치를 가져오지 못했습니다. 위치 권한을 확인해 주세요.");
    } finally {
      setIsBusy(false);
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    setError(null);
    setIsBusy(true);
    try {
      const result = await searchAddress(query.trim());
      if (!result) {
        setError("검색 결과가 없습니다. 다른 주소로 시도해 주세요.");
        return;
      }
      await applyCoords(result.coords, result.address);
    } catch {
      setError("주소 검색에 실패했습니다.");
    } finally {
      setIsBusy(false);
    }
  };

  const handleQueryKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleQueryKeyDown}
          placeholder="주소 또는 동네 이름으로 검색"
          className="flex-1"
        />
        <div className="flex gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={handleSearch}
            disabled={isBusy}
          >
            검색
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={handleUseCurrentLocation}
            disabled={isBusy}
          >
            현재 위치
          </Button>
        </div>
      </div>

      {error && <p className="text-xs text-danger">{error}</p>}

      <KakaoMap
        center={coords ?? DEFAULT_MAP_CENTER}
        level={4}
        onClick={(next) => applyCoords(next)}
        markers={
          coords
            ? [
                {
                  id: "picked-location",
                  ...coords,
                  draggable: true,
                  onDragEnd: (next) => applyCoords(next),
                },
              ]
            : []
        }
        className="h-64 w-full border border-border"
      />

      <p className="text-sm text-foreground">
        {coords ? (
          <>
            선택한 위치: <span className="font-medium">{address}</span>
          </>
        ) : (
          <span className="text-muted">
            지도를 클릭하거나 위 버튼으로 위치를 지정해 주세요.
          </span>
        )}
      </p>
    </div>
  );
}
