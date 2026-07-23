import Link from "next/link";
import { notFound } from "next/navigation";
import { DEFAULT_MAP_CENTER, URGENCY_LABEL } from "@/shared/config/constants";
import {
  Badge,
  Card,
  EmptyState,
  KakaoMap,
  type KakaoMapMarker,
} from "@/shared/ui";
import { MOCK_RECOMMENDATIONS, MOCK_REPORT_DETAIL } from "../../mock-data";

const URGENCY_TONE: Record<string, "success" | "warning" | "danger"> = {
  LOW: "success",
  MEDIUM: "warning",
  HIGH: "danger",
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

export default async function PreviewReportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const report = MOCK_REPORT_DETAIL[id];
  if (!report) notFound();

  const recommendations = MOCK_RECOMMENDATIONS[id] ?? [];
  const markers: KakaoMapMarker[] = recommendations.map((item, index) => ({
    id: `${item.name}-${index}`,
    lat: item.lat,
    lng: item.lng,
    title: item.name,
  }));

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-12">
      <div className="rounded-lg bg-amber-50 px-4 py-2 text-xs text-warning">
        목데이터 미리보기 화면입니다.
      </div>

      <Link
        href="/preview/reports"
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        ← 내 제보함으로
      </Link>

      <Card className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="accent">{report.category}</Badge>
          <Badge tone={URGENCY_TONE[report.urgency] ?? "neutral"}>
            긴급도 · {URGENCY_LABEL[report.urgency] ?? report.urgency}
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

      <Card className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-foreground">
          추천 시설·정책
        </h2>

        {recommendations.length === 0 ? (
          <EmptyState title="추천 정보를 찾지 못했어요" />
        ) : (
          <>
            <KakaoMap
              center={
                recommendations[0]
                  ? { lat: recommendations[0].lat, lng: recommendations[0].lng }
                  : DEFAULT_MAP_CENTER
              }
              markers={markers}
              className="h-64 w-full border border-border"
            />
            <ul className="flex flex-col gap-3">
              {recommendations.map((item, index) => (
                <li
                  key={`${item.name}-${index}`}
                  className="rounded-lg border border-border p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-foreground">
                      {item.name}
                    </p>
                    <Badge>{item.category}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted">{item.address}</p>
                  {item.source_url && (
                    <a
                      href={item.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-xs text-accent hover:underline"
                    >
                      자세히 보기
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </Card>

      <Card className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-foreground">출처</h2>
        {report.sources.length === 0 ? (
          <p className="text-sm text-muted">표시할 출처가 없습니다.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {report.sources.map((source, index) => (
              <li key={`${source.url}-${index}`} className="text-sm">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent hover:underline"
                >
                  {source.title}
                </a>
                <span className="text-muted">
                  {" "}
                  · {source.org} · {formatDate(source.updated_at)} 업데이트
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
