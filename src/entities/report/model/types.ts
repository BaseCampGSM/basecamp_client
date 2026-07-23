export type Urgency = "LOW" | "MEDIUM" | "HIGH";

export interface ReportSource {
  title: string;
  org: string;
  url: string;
  updated_at: string;
}

export interface ReportDetail {
  report_id: string;
  text: string;
  category: string;
  urgency: Urgency;
  solution: string;
  sources: ReportSource[];
  created_at: string;
}

export interface ReportListItem {
  report_id: string;
  text: string;
  category: string;
  status: string;
  created_at: string;
}

export interface CreateReportInput {
  text: string;
  lat: number;
  lng: number;
  address: string;
}

export interface CreateReportResult {
  report_id: string;
  status: string;
}

export interface AnalyzeReportResult {
  category: string;
  urgency: Urgency;
  solution: string;
  sources: ReportSource[];
}
