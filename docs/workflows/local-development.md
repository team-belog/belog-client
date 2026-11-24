# 로컬 개발

## 요구 사항

- Node.js는 잠긴 의존성의 `engines`를 충족하는 버전을 사용합니다. 현재 잠긴 `@firebase/app`은 Node.js `24.12.0` 이상을 요구합니다.
- 패키지 매니저는 npm입니다.

## 설치

```bash
npm ci
```

처음 실행하거나 잠금 파일이 변경된 경우 `npm ci`로 의존성을 맞춥니다.

## 실행

```bash
npm run dev
```

Next.js가 출력한 로컬 주소를 엽니다. 기본 주소는 `http://localhost:3000`입니다.

## 검사

변경 범위에 따라 lint, 타입 검사, 빌드와 브라우저 검증을 선택합니다. 명령과 선택 기준은 [검증](verification.md)을 따릅니다.

## 의존성 변경

직접 의존성과 허용 버전 범위는 `package.json`, 실제 설치 버전은 `package-lock.json`에서 관리합니다.

1. 변경 목적과 대상 버전의 Node.js 요구사항, 피어 의존성을 확인합니다. Next.js, React, ESLint,
   PWA 플러그인처럼 함께 동작하는 패키지는 호환성을 함께 검토합니다.
2. 전이 의존성의 보안 수정은 상위 패키지의 업데이트부터 검토합니다. `overrides`가 필요하면
   영향 버전과 적용 이유를 확인합니다.
3. npm으로 변경한 뒤 매니페스트와 잠금 파일의 diff를 함께 검토하고, `npm ci`로 설치를 확인합니다.
   목적과 무관한 버전 변경이 포함되었는지 살핍니다.

변경 후 lint, 타입 검사, 빌드와 영향을 받는 사용자 흐름을 확인합니다. 보안 업데이트는 `npm audit`
결과와 공식 권고에서 영향·수정 버전을 확인하고, 변경 후 대상 취약점의 해소 여부를 다시 확인합니다.
PWA 플러그인을 변경했다면 빌드 후 서비스 워커 등록도 확인합니다.

## 환경변수

API, Google 로그인, 지도, 웹 푸시를 로컬에서 확인할 때는 팀의 개발 환경 설정을 루트 `.env.local`에 둡니다. 아래 변수는 브라우저 번들에 포함되는 공개 설정입니다. 실제 값이 담긴 환경 파일과 서버 전용 비밀값은 저장소에 올리지 않습니다.

| 환경변수 | 용도 |
| --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | 백엔드 API 기본 주소 |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth 클라이언트 ID |
| `NEXT_PUBLIC_GOOGLE_REDIRECT_URI` | Google OAuth 콜백 주소 |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase 앱 API 키 |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase 앱의 인증 도메인 설정 |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase 프로젝트 ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase 앱의 스토리지 버킷 설정 |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging 발신자 ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase 앱 ID |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Firebase 앱 측정 ID |
| `NEXT_PUBLIC_FIREBASE_VAPID_KEY` | 웹 푸시 구독용 VAPID 키 |
| `NEXT_PUBLIC_KAKAO_MAP_KEY` | Pre-log 지도 API 키 |
| `NEXT_PUBLIC_AMPLITUDE_API_KEY` | Amplitude 프로젝트 키 |

Amplitude는 프로젝트 키가 설정된 브라우저에서 초기화합니다.
