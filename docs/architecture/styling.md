# 스타일링

Belog의 화면은 Tailwind CSS 유틸리티와 공용 UI를 사용합니다. 색과 텍스트 역할을 정할 때는 이미 사용
중인 토큰과 유사한 화면을 먼저 확인합니다.

## 현재 설정

- Tailwind CSS v3와 PostCSS를 사용합니다. `src/app/globals.css`에서 Tailwind 레이어, 글꼴 클래스와
  전역 스타일을 관리합니다.
- `tailwind.config.ts`에 브랜드 및 보조 색상 토큰과 Pretendard 폰트 패밀리를 정의합니다.
- 기본 화면에는 Pretendard Variable을 사용합니다. 티켓에는 PT Sans Narrow를 사용하는 텍스트가
  있습니다.

## 기존 토큰 사용

브랜드 강조에는 `main-mint`, 기본 텍스트에는 `main-black`, 얇은 테두리에는 `sub-gray-3`을 사용할 수
있습니다. 색상의 실제 값은 Tailwind 설정을 기준으로 확인합니다. 타이포그래피는 같은 역할의 제목,
본문, 설명에 어떤 `pretendard-*` 클래스가 쓰이는지 찾아 적용합니다.

```tsx
<section className="rounded-xl border border-sub-gray-3 bg-main-white">
  <h2 className="pretendard-sb-20 text-main-black">모임 기록</h2>
  <p className="pretendard-m-14 text-sub-gray-1">함께한 시간을 기록해요.</p>
</section>
```

## 적용 기준

- 화면 고유의 스타일은 JSX에서 Tailwind 유틸리티로 작성합니다. 전역 CSS는 앱 전체에 적용되는
  스타일을 관리합니다.
- 버튼, 입력, 모달은 공용 컴포넌트의 props와 상태 표현을 먼저 확인합니다. 예를 들어 공용 `Button`의
  `variant`는 시각적 역할을 정하고, `disabled`는 스타일과 비활성 동작에 적용됩니다. `bare`에 따라
  버튼 바깥 래퍼가 달라집니다.
- 루트 레이아웃은 `viewportFit: "cover"`를 사용하고 전역 스타일은 safe-area inset을 적용합니다.
  화면에 고정된 헤더, 하단 탭, 모달을 수정할 때는 모바일 브라우저와 설치형 PWA에서 콘텐츠나 다른
  조작 요소가 가려지는지 확인합니다.
- 아이콘만 있는 조작 요소에는 접근 가능한 이름을 지정합니다.
  공용 UI를 변경할 때는 사용 화면에서 포커스, 비활성 상태, 긴 텍스트와 좁은 화면을 확인합니다.
  사용처를 옮길 때는 [앱 구조](app-structure.md)의 공통화 기준을 참고합니다.
