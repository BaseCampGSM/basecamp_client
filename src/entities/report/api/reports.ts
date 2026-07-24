import { apiFetch } from "@/shared/api/client";
import type {
  CreateReportInput,
  CreateReportResult,
  ReportDetail,
  ReportListItem,
} from "../model/types";

export function createReport(input: CreateReportInput) {
  return apiFetch<CreateReportResult>("/api/v1/reports", {
    method: "POST",
    body: input,
  });
}

export function getReport(reportId: string) {
  return apiFetch<ReportDetail>(`/api/v1/reports/${reportId}`);
}

export function listReports() {
  return apiFetch<ReportListItem[]>("/api/v1/reports");
}
