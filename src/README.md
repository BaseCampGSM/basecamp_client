# 아키텍처 (Feature-Sliced Design)

Next.js App Router 특성상 라우팅은 `src/app`이 담당하므로, FSD의 `pages` 레이어는
Next.js와 이름이 겹치지 않도록 `views`로 명명했다.

## 레이어 (위에서 아래로 참조 가능, 역참조 금지)

```
app        Next.js 라우팅(app router) + 전역 provider, 전역 스타일
views      라우트 파일에서 렌더할 페이지 단위 조합 (구 FSD "pages")
widgets    여러 feature/entity를 조합한 독립적인 UI 블록
features   사용자 행동 단위 기능 (예: 좋아요, 로그인 폼)
entities   비즈니스 엔티티 (예: user, product)
shared     프로젝트 전역 공용 코드 (feature/entity 지식 없음)
```

- 상위 레이어는 하위 레이어만 import 할 수 있다. (`features` → `entities`, `shared` OK /
  `entities` → `features` 금지)
- 같은 레이어의 다른 슬라이스끼리는 직접 import 하지 않는다. (`features/a` → `features/b` 금지)
- 각 슬라이스는 `ui`, `model`, `api`, `lib`, `config` 세그먼트로 구성하고, 외부에는
  `index.ts`(public API)로만 노출한다.

## shared 하위 구성

```
shared/ui       공용 UI 컴포넌트 (버튼, 인풋 등 디자인 시스템)
shared/api      공용 API 클라이언트, fetcher 설정
shared/lib      공용 유틸 함수, 커스텀 훅
shared/config   환경 변수, 상수, 설정값
shared/types    공용 타입 정의
```

## import alias

`tsconfig.json`의 `@/*` → `./src/*` 를 사용한다.

```ts
import { Button } from "@/shared/ui";
import { LoginForm } from "@/features/login";
```
