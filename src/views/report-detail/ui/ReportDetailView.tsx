"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@/entities/user";
import { getReport, type ReportDetail } from "@/entities/report";
import { URGENCY_LABEL } from "@/shared/config/constants";
import { Badge, Card, Spinner } from "@/shared/ui";

const URGENCY_TONE: Record<string, "success" | "warning" | "danger"> = {
  하: "success",
  중: "warning",
  상: "danger",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ReportDetailView() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { user, isLoading: isUserLoading } = useUser();

  const [report, setReport] = useState<ReportDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isUserLoading) return;
    if (!user) {
      router.replace("/login");
      return;
    }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const fetchReport = () => {
      getReport(params.id)
        .then((reportResult) => {
          if (cancelled) return;
          setReport(reportResult);
          if (!reportResult.solution) {
            timer = setTimeout(fetchReport, 3000);
          }
        })
        .catch(() => {
          if (!cancelled) setError("제보 정보를 불러오지 못했습니다.");
        });
    };
    fetchReport();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [isUserLoading, user, router, params.id]);

  if (error) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <p className="text-sm text-danger">{error}</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex justify-center py-24">
        <Spinner className="h-6 w-6" />
      </div>
    );
  }

  if (!report.solution) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-24 text-center">
        <Spinner className="h-6 w-6" />
        <p className="text-sm text-muted">
          AI가 제보를 분석하고 있어요. 잠시만 기다려 주세요.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-12">
      <Link
        href="/reports"
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        ← 내 제보함으로
      </Link>

      <Card className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="accent">{report.category}</Badge>
          <Badge tone={URGENCY_TONE[report.urgency ?? ""] ?? "neutral"}>
            긴급도 · {URGENCY_LABEL[report.urgency ?? ""] ?? report.urgency}
          </Badge>
          <span className="ml-auto text-xs text-muted">
            {formatDate(report.created_at)}
          </span>
        </div>
        <p className="whitespace-pre-line text-sm text-foreground">
          {report.text}
        </p>
      </Card>

      <Card className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-foreground">AI 해결 방안</h2>
        <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">
          {report.solution}
        </p>
      </Card>
    </div>
  );
}
