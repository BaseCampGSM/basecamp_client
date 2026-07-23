"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Textarea } from "@/shared/ui";
import type { Coordinates } from "@/shared/lib/geolocation";
import { analyzeReport, createReport } from "@/entities/report";
import { LocationPicker } from "./LocationPicker";

type Step = "idle" | "submitting" | "analyzing";

const SUBMIT_LABEL: Record<Step, string> = {
  idle: "AI에게 물어보기",
  submitting: "제보 접수 중…",
  analyzing: "AI가 분석하는 중…",
};

export function ReportForm() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [address, setAddress] = useState("");
  const [step, setStep] = useState<Step>("idle");
  const [error, setError] = useState<string | null>(null);

  const isSubmitting = step !== "idle";
  const canSubmit = text.trim().length > 0 && coords !== null && !isSubmitting;

  const handleLocationChange = (nextCoords: Coordinates, nextAddress: string) => {
    setCoords(nextCoords);
    setAddress(nextAddress);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!coords) return;

    setError(null);
    setStep("submitting");
    try {
      const created = await createReport({
        text: text.trim(),
        lat: coords.lat,
        lng: coords.lng,
        address,
      });

      setStep("analyzing");
      await analyzeReport(created.report_id);

      router.push(`/reports/${created.report_id}`);
    } catch {
      setError("제보 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      setStep("idle");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="report-text"
            className="text-sm font-medium text-foreground"
          >
            어떤 문제가 있나요?
          </label>
          <Textarea
            id="report-text"
            rows={4}
            placeholder='예) "집 근처 가로등이 어두워 밤길이 위험해요"'
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">위치</span>
          <LocationPicker
            coords={coords}
            address={address}
            onChange={handleLocationChange}
          />
        </div>

        {error && <p className="text-sm text-danger">{error}</p>}

        <Button type="submit" disabled={!canSubmit}>
          {SUBMIT_LABEL[step]}
        </Button>
      </Card>
    </form>
  );
}
