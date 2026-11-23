# 코드 작성 컨벤션

## 파일과 폴더

| 대상 | 형태 | 예시 |
| --- | --- | --- |
| 기능 폴더 | 소문자, 여러 단어는 kebab-case | `group/`, `pre-log/` |
| 컴포넌트 | PascalCase | `GroupHomeView.tsx` |
| 훅 | camelCase, `use` 접두사 | `useGroups.ts` |
| API, 쿼리 키 | camelCase | `groupApi.ts`, `groupKeys.ts` |
| Next.js 진입점 | 프레임워크 파일 이름 | `page.tsx`, `layout.tsx`, `route.ts` |

## 컴포넌트

- 화면과 컴포넌트의 주된 형태는 `export default function`입니다. 훅, 요청 함수, 쿼리 키는 이름 있는 export를 사용합니다.
- 사용자 이벤트나 브라우저 API가 필요한 경우 이미 클라이언트 컴포넌트 트리 안에 있는지 먼저 확인합니다. 새로운 클라이언트 경계는 필요한 진입점에 둡니다.
- 새 UI는 역할에 맞는 HTML 요소를 사용합니다. 스타일이나 레이아웃을 위한 래퍼는 실제로 필요한 경우에 추가합니다.

## 타입

- 타입 이름은 PascalCase를 사용합니다. 컴포넌트 props는 `BackHeaderProps`처럼 `Props`로 끝나는 이름을 사용합니다.
- 한 컴포넌트가 사용하는 props 타입은 컴포넌트 옆에 둡니다. API 응답이나 여러 파일에서 공유하는 기능 타입은 해당 기능의 기존 `types/index.ts`를 먼저 확인합니다.
- props에는 `interface`를, API의 데이터 형태나 문자열 값의 union에는 `type`을 사용하는 사례가 많습니다. 수정할 때는 주변 선언 형태와 데이터 계약에 맞춥니다.

```tsx
interface BackHeaderProps {
  title: string;
  onBack?: () => void;
  onShare?: () => void;
  right?: React.ReactNode;
}
```

## 변수와 함수

- 재할당이 없는 값은 `const`로 선언합니다. `TAB_LABELS`처럼 고정 레이블 목록은 `UPPER_SNAKE_CASE`를 쓰는 사례가 있습니다. 설정 객체와 스타일 맵은 `firebaseConfig`, `variantStyles`처럼 주변 코드의 이름 형태를 따릅니다.
- 불리언 이름은 `isPending`, `hasNextPage`, `canEditCoverImage`처럼 상태나 가능 여부를 드러냅니다.
- 이벤트 핸들러에는 `handleBack`처럼 동작을 붙입니다. 자식이 받는 콜백은 `onBack`처럼 호출 시점을 드러냅니다.

| 함수 예시 | 역할 |
| --- | --- |
| `getGroupDetail` | 상세 데이터 조회 |
| `createGroup` | 그룹 생성 요청 |
| `useToggleGroupPin` | 고정·해제 요청 및 관련 캐시 연결 |

## import

- `@/`는 `src/`를 가리킵니다. 기능 경계를 넘거나 공용 모듈을 가져올 때 사용합니다. 같은 기능의 인접 파일은 기존에 사용하는 형태를 따릅니다.
- 타입만 참조하는 import는 `import type`을 사용합니다. 대상 파일의 형식은 주변 코드에 맞추고 정적 검사 기준은 ESLint와 TypeScript 설정을 따릅니다.

## 상태와 로직

- 여러 화면에서 공유하는 역할이나 특정 기능의 책임은 먼저 기존 소유 위치를 확인합니다. 페이지 진입점에는 경로 처리와 화면 조합을 두고, 별도 기능 로직은 해당 기능의 컴포넌트나 훅에서 관리합니다. [앱 구조와 의존성](../architecture/app-structure.md)
- 서버 상태의 조회 키와 갱신 범위는 기존 기능의 TanStack Query 훅을 참고합니다. 화면 안에서만 필요한 값은 화면이 관리합니다.

## 접근성

- 아이콘 버튼에는 접근 가능한 이름을 지정합니다. `BackHeader`의 뒤로 가기 버튼은 `aria-label="뒤로 가기"`를 사용합니다.
- 입력 요소를 추가하거나 수정할 때 화면의 레이블과 오류 메시지가 입력에 연결되는지 확인합니다.
- 키보드로 조작할 수 있는지 확인하고 포커스가 이동할 때 현재 위치를 화면에 표시합니다.
