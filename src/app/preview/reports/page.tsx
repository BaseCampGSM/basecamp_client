import Link from "next/link";
import { Badge, Card } from "@/shared/ui";
import { MOCK_REPORT_LIST } from "../mock-data";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PreviewReportsListPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-12">
      <div className="rounded-lg bg-amber-50 px-4 py-2 text-xs text-warning">
        목데이터 미리보기 화면입니다. 실제 라우트가 아니라 /preview/reports
        에서만 보여요.
      </div>
      <h1 className="text-xl font-bold text-foreground">
        내 제보함 (미리보기)
      </h1>
      <div className="flex flex-col gap-3">
        {MOCK_REPORT_LIST.map((report) => (
          <Link
            key={report.report_id}
            href={`/preview/reports/${report.report_id}`}
          >
            <Card className="flex flex-col gap-3 transition-shadow hover:shadow-md">
              <div className="flex items-center justify-between gap-2">
                <Badge tone="accent">{report.category}</Badge>
                <span className="text-xs text-muted">
                  {formatDate(report.created_at)}
                </span>
              </div>
              <p className="line-clamp-2 text-sm text-foreground">
                {report.text}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
