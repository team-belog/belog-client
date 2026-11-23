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

Amplitude는 프로젝트 키가 설정된 브라우저에서 초기화합니다. 이벤트 변경 시 [Amplitude 이벤트](../analytics/amplitude.md)를 참고합니다.
