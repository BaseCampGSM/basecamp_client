import { env } from "@/shared/config/env";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type ApiFetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

let onUnauthorized: (() => void) | null = null;

export function setUnauthorizedHandler(handler: (() => void) | null) {
  onUnauthorized = handler;
}

export async function apiFetch<T>(
  path: string,
  { body, headers, ...init }: ApiFetchOptions = {},
): Promise<T> {
  const requestHeaders = new Headers(headers);
  requestHeaders.set("Content-Type", "application/json");

  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    ...init,
    credentials: "include",
    headers: requestHeaders,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!response.ok) {
    if (response.status === 401) onUnauthorized?.();
    const message = await response.text().catch(() => response.statusText);
    throw new ApiError(response.status, message || response.statusText);
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}
