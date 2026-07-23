"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/entities/user";
import { listReports, type ReportListItem } from "@/entities/report";
import { ReportCard } from "@/widgets/report-card";
import { EmptyState, Spinner } from "@/shared/ui";

export function ReportsListView() {
  const router = useRouter();
  const { user, isLoading: isUserLoading } = useUser();
  const [reports, setReports] = useState<ReportListItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isUserLoading) return;
    if (!user) {
      router.replace("/login");
      return;
    }

    let cancelled = false;
    listReports()
      .then((result) => {
        if (!cancelled) setReports(result);
      })
      .catch(() => {
        if (!cancelled) setError("제보 목록을 불러오지 못했습니다.");
      });

    return () => {
      cancelled = true;
    };
  }, [isUserLoading, user, router]);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-12">
      <h1 className="text-xl font-bold text-foreground">내 제보함</h1>

      {error && <p className="text-sm text-danger">{error}</p>}

      {!reports && !error ? (
        <div className="flex justify-center py-16">
          <Spinner className="h-6 w-6" />
        </div>
      ) : reports && reports.length === 0 ? (
        <EmptyState
          title="아직 등록한 제보가 없어요"
          description="첫 제보를 남기고 AI의 분석 결과를 확인해 보세요."
        />
      ) : (
        <div className="flex flex-col gap-3">
          {reports?.map((report) => (
            <ReportCard key={report.report_id} report={report} />
          ))}
        </div>
      )}
    </div>
  );
}
