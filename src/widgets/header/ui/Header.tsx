"use client";

import Link from "next/link";
import { useUser } from "@/entities/user";
import { LogoutButton } from "@/features/auth-logout";
import { Button, Spinner } from "@/shared/ui";

export function Header() {
  const { user, isLoading } = useUser();

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
        <Link href="/" className="text-base font-bold text-foreground">
          우리동네 AI
        </Link>

        <nav className="flex items-center gap-4">
          {user && (
            <Link
              href="/reports"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              내 제보함
            </Link>
          )}

          {isLoading ? (
            <Spinner />
          ) : user ? (
            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-muted sm:inline">
                {user.name ?? user.email}
              </span>
              <LogoutButton />
            </div>
          ) : (
            <Link href="/login">
              <Button type="button" size="sm" variant="secondary">
                로그인
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
