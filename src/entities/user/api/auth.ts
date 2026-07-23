import { apiFetch } from "@/shared/api/client";
import type { User } from "../model/types";

export function getMe() {
  return apiFetch<User>("/api/v1/users/me");
}

export function logout() {
  return apiFetch<{ status: string }>("/api/v1/auth/logout", {
    method: "POST",
  });
}
