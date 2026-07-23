import type { ReportDetail, ReportListItem } from "@/entities/report";
import type { Recommendation } from "@/entities/recommendation";

export const MOCK_REPORT_LIST: ReportListItem[] = [
  {
    report_id: "mock-2",
    text: "학교 근처에 학생들이 쉴 수 있는 공간이 부족해요",
    category: "청소년 문화·복지",
    status: "completed",
    created_at: "2026-07-18T14:30:00+09:00",
  },
  {
    report_id: "mock-1",
    text: "집 근처 가로등이 어두워 밤길이 위험해요",
    category: "안전·시설",
    status: "completed",
    created_at: "2026-07-20T09:12:00+09:00",
  },
  {
    report_id: "mock-3",
    text: "동네 놀이터 그네가 고장나서 위험해 보여요",
    category: "안전·시설",
    status: "processing",
    created_at: "2026-07-15T11:05:00+09:00",
  },
];

export const MOCK_REPORT_DETAIL: Record<string, ReportDetail> = {
  "mock-2": {
    report_id: "mock-2",
    text: "학교 근처에 학생들이 쉴 수 있는 공간이 부족해요",
    category: "청소년 문화·복지",
    urgency: "MEDIUM",
    solution:
      "가까운 청소년 문화센터를 무료로 이용하실 수 있어요.\n\n1. 가까운 청소년 시설 이용 안내\n2. 지역 청소년 공간 신청 방법 안내\n3. 관련 정책 확인 (출처 링크 제공)",
    sources: [
      {
        title: "청소년 문화의 집 이용 안내",
        org: "여성가족부",
        url: "https://www.mogef.go.kr",
        updated_at: "2026-06-01T00:00:00+09:00",
      },
      {
        title: "지역 청소년 공간 지원 사업",
        org: "서울특별시",
        url: "https://www.seoul.go.kr",
        updated_at: "2026-05-15T00:00:00+09:00",
      },
    ],
    created_at: "2026-07-18T14:30:00+09:00",
  },
  "mock-1": {
    report_id: "mock-1",
    text: "집 근처 가로등이 어두워 밤길이 위험해요",
    category: "안전·시설",
    urgency: "HIGH",
    solution:
      "인근 가로등 고장 신고는 안전신문고 앱 또는 120 다산콜센터로 접수하실 수 있어요. 접수 후 통상 3~5일 내 현장 점검이 진행됩니다.",
    sources: [
      {
        title: "가로등 고장 신고 안내",
        org: "서울특별시 시설관리공단",
        url: "https://www.safepatrol.go.kr",
        updated_at: "2026-07-01T00:00:00+09:00",
      },
    ],
    created_at: "2026-07-20T09:12:00+09:00",
  },
  "mock-3": {
    report_id: "mock-3",
    text: "동네 놀이터 그네가 고장나서 위험해 보여요",
    category: "안전·시설",
    urgency: "MEDIUM",
    solution:
      "AI가 관련 공공데이터를 분석하고 있어요. 잠시 후 다시 확인해 주세요.",
    sources: [],
    created_at: "2026-07-15T11:05:00+09:00",
  },
};

export const MOCK_RECOMMENDATIONS: Record<string, Recommendation[]> = {
  "mock-2": [
    {
      name: "종로 청소년 문화의 집",
      category: "청소년시설",
      lat: 37.572,
      lng: 126.9794,
      address: "서울 종로구 종로 100",
      source_url: "https://www.mogef.go.kr",
    },
    {
      name: "중구 청소년 문화센터",
      category: "청소년시설",
      lat: 37.5636,
      lng: 126.997,
      address: "서울 중구 세종대로 50",
      source_url: "https://www.seoul.go.kr",
    },
  ],
  "mock-1": [
    {
      name: "종로구 시설관리팀",
      category: "행정기관",
      lat: 37.5729,
      lng: 126.9793,
      address: "서울 종로구 종로1가",
      source_url: "https://www.safepatrol.go.kr",
    },
  ],
  "mock-3": [],
};
