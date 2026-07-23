import { env } from "@/shared/config/env";

export function buildGoogleAuthUrl(): string {
  return `${env.apiBaseUrl}/oauth2/authorization/google`;
}
