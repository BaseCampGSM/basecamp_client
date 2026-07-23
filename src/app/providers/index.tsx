"use client";

import { UserSessionProvider } from "@/entities/user";

export function Providers({ children }: { children: React.ReactNode }) {
  return <UserSessionProvider>{children}</UserSessionProvider>;
}
