"use client";

import { useUser } from "@/entities/user";
import { GoogleLoginButton } from "@/features/auth-google-login";
import { ReportForm } from "@/features/report-create";
import { Card, Spinner } from "@/shared/ui";

export function HomeView() {
  const { user, isLoading } = useUser();

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-12">
      <header className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-foreground">
          우리 동네 문제, AI에게 물어보세요
        </h1>
        <p className="text-sm text-muted">
          불편한 점을 편하게 적어주시면 AI가 관련 공공 정보와 지원 정책을
          찾아드려요.
        </p>
      </header>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Spinner className="h-6 w-6" />
        </div>
      ) : user ? (
        <ReportForm />
      ) : (
        <Card className="flex flex-col items-center gap-4 py-10 text-center">
          <p className="text-sm text-muted">
            제보를 남기려면 먼저 로그인해 주세요.
          </p>
          <div className="w-full max-w-xs">
            <GoogleLoginButton />
          </div>
        </Card>
      )}
    </div>
  );
}
