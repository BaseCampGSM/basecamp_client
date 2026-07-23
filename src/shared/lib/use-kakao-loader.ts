"use client";

import { useEffect, useState } from "react";
import { env } from "@/shared/config/env";

let loaderPromise: Promise<void> | null = null;

function loadKakaoSdk(): Promise<void> {
  if (window.kakao?.maps) return Promise.resolve();
  if (loaderPromise) return loaderPromise;

  loaderPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${env.kakaoJsKey}&libraries=services&autoload=false`;
    script.async = true;
    script.onload = () => window.kakao.maps.load(() => resolve());
    script.onerror = () =>
      reject(new Error("카카오맵 SDK를 불러오지 못했습니다."));
    document.head.appendChild(script);
  });

  return loaderPromise;
}

export function useKakaoLoader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(() =>
    env.kakaoJsKey
      ? null
      : "카카오맵 JavaScript 키가 설정되지 않았습니다 (.env.local 확인)."
  );

  useEffect(() => {
    if (!env.kakaoJsKey) return;

    let cancelled = false;
    loadKakaoSdk()
      .then(() => {
        if (!cancelled) setIsLoaded(true);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { isLoaded, error };
}
