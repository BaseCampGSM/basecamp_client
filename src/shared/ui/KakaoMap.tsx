"use client";

import { useEffect, useRef } from "react";
import { useKakaoLoader } from "@/shared/lib/use-kakao-loader";
import type { Coordinates } from "@/shared/lib/geolocation";
import { Spinner } from "@/shared/ui/Spinner";
import { cn } from "@/shared/lib/cn";

export interface KakaoMapMarker extends Coordinates {
  id: string;
  title?: string;
  draggable?: boolean;
  onDragEnd?: (coords: Coordinates) => void;
}

interface KakaoMapProps {
  center: Coordinates;
  level?: number;
  markers?: KakaoMapMarker[];
  onClick?: (coords: Coordinates) => void;
  className?: string;
}

export function KakaoMap({
  center,
  level = 4,
  markers = [],
  onClick,
  className,
}: KakaoMapProps) {
  const { isLoaded, error } = useKakaoLoader();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<kakao.maps.Map | null>(null);

  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    mapRef.current = new window.kakao.maps.Map(containerRef.current, {
      center: new window.kakao.maps.LatLng(center.lat, center.lng),
      level,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setCenter(
      new window.kakao.maps.LatLng(center.lat, center.lng)
    );
  }, [center.lat, center.lng]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !onClick) return;

    const handleClick = (e: unknown) => {
      const latlng = (e as { latLng: kakao.maps.LatLng }).latLng;
      onClick({ lat: latlng.getLat(), lng: latlng.getLng() });
    };

    window.kakao.maps.event.addListener(
      map,
      "click",
      handleClick as never
    );
    return () => {
      window.kakao.maps.event.removeListener(
        map,
        "click",
        handleClick as never
      );
    };
  }, [onClick, isLoaded]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const instances = markers.map((marker) => {
      const position = new window.kakao.maps.LatLng(marker.lat, marker.lng);
      const kakaoMarker = new window.kakao.maps.Marker({
        position,
        map,
        draggable: marker.draggable,
        title: marker.title,
      });

      if (marker.draggable && marker.onDragEnd) {
        const handleDragEnd = () => {
          const pos = kakaoMarker.getPosition();
          marker.onDragEnd?.({ lat: pos.getLat(), lng: pos.getLng() });
        };
        window.kakao.maps.event.addListener(
          kakaoMarker,
          "dragend",
          handleDragEnd as never
        );
      }

      return kakaoMarker;
    });

    return () => {
      instances.forEach((instance) => instance.setMap(null));
    };
  }, [markers, isLoaded]);

  if (error) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-xl border border-border bg-muted-bg text-sm text-muted",
          className
        )}
      >
        {error}
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-xl", className)}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted-bg">
          <Spinner />
        </div>
      )}
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
}
