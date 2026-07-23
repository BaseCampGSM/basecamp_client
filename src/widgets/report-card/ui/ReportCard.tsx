import Link from "next/link";
import type { ReportListItem } from "@/entities/report";
import { Badge, Card } from "@/shared/ui";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function ReportCard({ report }: { report: ReportListItem }) {
  return (
    <Link href={`/reports/${report.report_id}`}>
      <Card className="flex flex-col gap-3 transition-shadow hover:shadow-md">
        <div className="flex items-center justify-between gap-2">
          <Badge tone="accent">{report.category || "분석 중"}</Badge>
          <span className="text-xs text-muted">
            {formatDate(report.created_at)}
          </span>
        </div>
        <p className="line-clamp-2 text-sm text-foreground">{report.text}</p>
      </Card>
    </Link>
  );
}
