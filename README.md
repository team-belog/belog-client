# Belog Client

Next.js 15 + TypeScript + Tailwind CSS 기반 PWA 프로젝트

---

## 시작하기

```bash
npm install
npm run dev
```

`http://localhost:3000` 에서 확인

---

## 기술 스택

| 항목 | 내용 |
|------|------|
| 프레임워크 | Next.js 15 (App Router) |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS v3 |
| 폰트 | Pretendard (Variable) |
| PWA | @ducanh2912/next-pwa |

---

## 폴더 구조

```
belog-client/
├── public/                     # 정적 파일 (빌드 결과물 포함 X)
│   ├── icons/                  # PWA 아이콘
│   │   ├── icon-192x192.png
│   │   └── icon-512x512.png
│   └── manifest.json           # PWA 설정 파일
│
├── src/
│   ├── app/                    # Next.js 라우팅 (페이지 파일만)
│   │   ├── (auth)/             # 로그인/회원가입 레이아웃 그룹
│   │   │   ├── login/
│   │   │   │   └── page.tsx    # /login 페이지
│   │   │   └── register/
│   │   │       └── page.tsx    # /register 페이지
│   │   │
│   │   ├── (main)/             # 하단 탭 네비게이션 레이아웃 그룹
│   │   │   ├── layout.tsx      # BottomNav가 포함된 공통 레이아웃
│   │   │   ├── page.tsx        # / 홈 페이지
│   │   │   ├── group/
│   │   │   │   └── page.tsx    # /group 페이지
│   │   │   ├── my/
│   │   │   │   └── page.tsx    # /my 페이지
│   │   │   ├── pre-log/
│   │   │   │   └── page.tsx    # /pre-log 페이지
│   │   │   ├── bill-log/
│   │   │   │   └── page.tsx    # /bill-log 페이지
│   │   │   ├── post-log/
│   │   │   │   └── page.tsx    # /post-log 페이지
│   │   │   ├── notification/
│   │   │   │   └── page.tsx    # /notification 페이지
│   │   │   └── setting/
│   │   │       └── page.tsx    # /setting 페이지
│   │   │
│   │   ├── layout.tsx          # 루트 레이아웃 (폰트, 메타데이터)
│   │   ├── globals.css         # 전역 스타일 + Tailwind + 폰트 토큰
│   │   └── icon.png            # 브라우저 탭 파비콘
│   │
│   ├── features/               # 핵심 폴더: 기능 단위 모듈
│   │   ├── auth/
│   │   ├── home/
│   │   ├── group/
│   │   ├── my/
│   │   ├── pre-log/
│   │   ├── bill-log/
│   │   ├── post-log/
│   │   ├── notification/
│   │   └── setting/
│   │       ├── components/     # 이 기능에서만 쓰는 컴포넌트
│   │       ├── hooks/          # 이 기능에서만 쓰는 커스텀 훅
│   │       └── api/            # 이 기능의 API 호출 함수
│   │
│   ├── components/             # 여러 기능에서 공통으로 쓰는 컴포넌트
│   │   ├── ui/                 # 버튼, 인풋, 모달 등 원자 단위 UI
│   │   └── layout/             # BottomNav 등 레이아웃 컴포넌트
│   │
│   ├── hooks/                  # 전역 공통 커스텀 훅
│   ├── lib/                    # 외부 라이브러리 설정 (axios 등)
│   └── constants/              # 전역 상수
│
├── tailwind.config.ts          # 디자인 시스템 컬러 + 폰트 설정
├── next.config.ts              # Next.js + PWA 설정
└── .gitignore
```

---

## 폴더별 역할 상세

### `app/` — 라우팅만 담당

Next.js는 `app/` 폴더 안의 `page.tsx` 파일을 자동으로 URL 경로로 인식합니다.

- `page.tsx` 파일 안에는 **로직을 넣지 않고**, `features/` 에서 만든 컴포넌트를 불러와 배치만 합니다.
- `layout.tsx` 는 해당 폴더 하위 페이지에 공통으로 적용되는 틀입니다.

> **라우트 그룹 `(auth)`, `(main)`** — 괄호로 감싼 폴더는 URL에 포함되지 않습니다.
> `(main)/group/page.tsx` → 실제 URL은 `/group`

```tsx
// app/(main)/group/page.tsx 작성 예시
import GroupList from "@/features/group/components/GroupList";

export default function GroupPage() {
  return <GroupList />;
}
```

---

### `features/` — 기능 단위 모듈 (핵심)

각 기능에 필요한 컴포넌트, 훅, API 호출을 한 폴더 안에 모아둡니다.
2명이 각자 다른 feature를 맡으면 코드 충돌을 최소화할 수 있습니다.

```
features/group/
├── components/
│   ├── GroupList.tsx       # 그룹 목록 UI
│   └── GroupCard.tsx       # 그룹 카드 UI
├── hooks/
│   └── useGroupList.ts     # 그룹 데이터 불러오는 훅
└── api/
    └── groupApi.ts         # 그룹 관련 API 호출 함수
```

---

### `components/` — 공통 컴포넌트

여러 feature에서 함께 쓰는 컴포넌트를 둡니다.

- `ui/` — 디자인 시스템 기반의 공통 UI (버튼, 인풋, 뱃지 등)
- `layout/` — BottomNav처럼 페이지 구조에 쓰이는 컴포넌트

> `ui/` 컴포넌트는 두 사람 모두 건드리는 영역이므로 수정 전 팀원과 소통 필요

---

### `hooks/` — 전역 공통 훅

특정 feature에 속하지 않고 여러 곳에서 쓰이는 훅을 둡니다.

```
hooks/
└── useDebounce.ts
```

---

### `lib/` — 외부 라이브러리 설정

axios 인스턴스, react-query 클라이언트 등 라이브러리 초기 설정 파일을 둡니다.

---

### `constants/` — 전역 상수

라우트 경로, API 엔드포인트 등 앱 전체에서 쓰이는 상수를 둡니다.

---

## 디자인 시스템

### 컬러

`tailwind.config.ts`에 정의된 커스텀 컬러를 사용합니다.

```tsx
<div className="bg-main-mint text-main-black" />
<div className="bg-sub-gray-3 text-sub-gray-1" />
```

| 토큰 | 값 | 용도 |
|------|----|------|
| `main-mint` | `#49D4B6` | 메인 브랜드 컬러 |
| `main-cool-gray` | `#F7F8F9` | 배경 |
| `main-black` | `#303237` | 주요 텍스트 |
| `main-white` | `#FFFFFF` | 흰 배경 |
| `sub-black` | `#2B2B2B` | 보조 텍스트 |
| `sub-white` | `#FBFCFE` | 보조 배경 |
| `sub-white-2` | `#F8F8F8` | 보조 배경 2 |
| `sub-gray-1` | `#5F5F5F` | 중간 텍스트 |
| `sub-gray-2` | `#A6A6A6` | 비활성 텍스트 |
| `sub-gray-3` | `#DFE1E5` | 구분선, 테두리 |
| `sub-gray-4` | `#303237` | 강조 어두운 |

### 폰트 토큰

`globals.css`에 정의된 클래스를 사용합니다.

```tsx
<h1 className="pretendard-sb-20">제목</h1>
<p className="pretendard-m-14">본문</p>
<span className="pretendard-r-15">설명</span>
```

| 클래스 | 굵기 | 크기 | 행간 |
|--------|------|------|------|
| `pretendard-sb-10` | SemiBold | 10px | auto |
| `pretendard-sb-16` | SemiBold | 16px | auto |
| `pretendard-sb-18` | SemiBold | 18px | auto |
| `pretendard-sb-20` | SemiBold | 20px | auto |
| `pretendard-m-12` | Medium | 12px | auto |
| `pretendard-m-14` | Medium | 14px | auto |
| `pretendard-m-15` | Medium | 15px | 22px |
| `pretendard-m-16` | Medium | 16px | auto |
| `pretendard-r-15` | Regular | 15px | 22px |
| `pretendard-r-30` | Regular | 30px | auto |

---

## 개발 규칙

### 참조 방향 (단방향)

```
app/ → features/ → components/ → lib/
```

역방향 참조 금지 — `components/`가 `features/`를 import 하면 안 됩니다.

### 클라이언트 컴포넌트

Next.js는 기본이 서버 컴포넌트입니다. `useState`, `useEffect`, 이벤트 핸들러가 필요한 컴포넌트에는 파일 상단에 `"use client"`를 선언합니다.

```tsx
"use client";

import { useState } from "react";
```

### import 경로

`@/` 는 `src/` 를 가리킵니다.

```tsx
import BottomNav from "@/components/layout/BottomNav";
import GroupList from "@/features/group/components/GroupList";
```
