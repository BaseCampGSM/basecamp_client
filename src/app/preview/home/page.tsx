import { ReportForm } from "@/features/report-create";

export default function PreviewHomePage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-12">
      <div className="rounded-lg bg-amber-50 px-4 py-2 text-xs text-warning">
        목데이터 미리보기 화면입니다. 로그인 없이 제보 작성 폼 UI만 확인하는
        용도예요. (제출 버튼을 누르면 백엔드가 없어서 에러가 뜨는 게 정상입니다)
      </div>
      <header className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-foreground">
          우리 동네 문제, AI에게 물어보세요
        </h1>
        <p className="text-sm text-muted">
          불편한 점을 편하게 적어주시면 AI가 관련 공공 정보와 지원 정책을
          찾아드려요.
        </p>
      </header>
      <ReportForm />
    </div>
  );
}
