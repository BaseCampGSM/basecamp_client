"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/entities/user";
import { GoogleLoginButton } from "@/features/auth-google-login";
import { Card, Spinner } from "@/shared/ui";

export function LoginView() {
  const router = useRouter();
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && user) router.replace("/");
  }, [isLoading, user, router]);

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-6 px-4 py-24">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-xl font-bold text-foreground">로그인</h1>
        <p className="text-sm text-muted">
          Google 계정으로 로그인하고 우리 동네 문제를 제보해 보세요.
        </p>
      </div>

      <Card className="flex flex-col items-center gap-4 py-8">
        {isLoading ? <Spinner className="h-6 w-6" /> : <GoogleLoginButton />}
      </Card>
    </div>
  );
}
