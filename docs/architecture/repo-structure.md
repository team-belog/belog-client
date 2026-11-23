# 저장소 구조

Belog는 단일 Next.js 앱입니다. 모임 전 계획을 기록하는 Pre-log, 사진과 티켓을 남기는 Post-log, 모임 비용을 정산하는 Bill-log를 하나의 모바일 웹 PWA로 제공합니다.

## 루트 구성

```text
.agents/
.github/
docs/
public/
src/
AGENTS.md
```

- `.agents`에 에이전트가 작업 유형별로 사용하는 스킬을 둡니다.
- `.github`에 이슈·PR 템플릿과 Slack 알림 워크플로를 둡니다.
- `docs`에 아키텍처, 컨벤션, 개발 절차를 둡니다.
- `public`에 URL로 제공하는 아이콘, 이미지, PWA 매니페스트와 Firebase Messaging 워커를 둡니다.
- `src`에 화면, 제품 기능, 공용 코드와 외부 연동을 둡니다.
- `AGENTS.md`는 작업 흐름과 스킬, 세부 문서를 안내하는 진입점입니다.

## 파일을 찾는 방법

- 화면은 URL에 해당하는 `app`의 `page.tsx`와 상위 `layout.tsx`에서 찾습니다. 기능을 수정할 때는 진입점이 사용하는 컴포넌트와 훅을 따라갑니다.
- 일반 정적 아이콘과 이미지는 `public/icons`에서 찾습니다. 사이트 메타데이터는 루트 레이아웃, 설치 정보는 `public/manifest.json`, 캐싱 워커 설정은 `next.config.ts`를 확인합니다.
- 패키지와 스크립트는 `package.json`, 설치 버전은 `package-lock.json`이 기준입니다. 개발 명령과 환경변수는 [로컬 개발](../workflows/local-development.md)에 정리합니다.
- 기존 디렉터리에서 역할에 맞는 위치를 먼저 찾습니다. 소스 내부의 배치 기준은 [앱 구조](app-structure.md)를 참고합니다.
