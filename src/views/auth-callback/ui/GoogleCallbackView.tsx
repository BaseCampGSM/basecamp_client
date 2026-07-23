"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/entities/user";
import { Button, Card, Spinner } from "@/shared/ui";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refresh } = useUser();

  const status = searchParams.get("status");
  const message = searchParams.get("message");
  const isError = status === "error";

  useEffect(() => {
    if (isError) return;

    let cancelled = false;

    refresh().then(() => {
      if (!cancelled) router.replace("/");
    });

    return () => {
      cancelled = true;
    };
  }, [isError, refresh, router]);

  if (isError) {
    return (
      <Card className="flex flex-col items-center gap-4 text-center">
        <p className="text-sm text-danger">
          {message ?? "Google 로그인에 실패했습니다."}
        </p>
        <Button variant="secondary" onClick={() => router.replace("/login")}>
          로그인 화면으로 돌아가기
        </Button>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col items-center gap-3 py-10 text-center">
      <Spinner className="h-6 w-6" />
      <p className="text-sm text-muted">Google 계정으로 로그인 중입니다…</p>
    </Card>
  );
}

export function GoogleCallbackView() {
  return (
    <div className="mx-auto flex max-w-sm flex-col px-4 py-24">
      <Suspense fallback={<Spinner className="mx-auto h-6 w-6" />}>
        <CallbackContent />
      </Suspense>
    </div>
  );
}
