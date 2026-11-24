# Git과 GitHub 컨벤션

## 이슈

기능은 `[FEAT]`, 버그는 `[BUG]` 이슈 템플릿을 사용합니다. 기능 이슈에는 필요한 동작과 대상 화면을,
버그 이슈에는 재현 방법과 예상·실제 결과를 적습니다.

## 브랜치

`develop`에서 기능을 통합하고 `main`에서 운영 배포합니다. 브랜치명에는 Linear 이슈 키를 사용합니다.
이슈 키만 쓰거나 작업 설명과 함께 포함할 수 있습니다.

```text
DEV-7
DEV-7-agent-harness
```

## 커밋

커밋 메시지는 변경 유형으로 시작하고 변경 내용을 한 줄로 표현합니다. 기존 이력에서 `feat`, `fix`,
`design`, `refactor`, `chore`를 확인할 수 있습니다.

```text
feat: 티켓 저장 버튼에 로딩 상태 추가
fix: 사진 상세 좋아요 초기값을 URL params 대신 캐시에서 읽도록 수정
refactor: Pre-log·Post-log·Bill-log 화면의 Page Viewed 이벤트 제거
```

## Pull Request

- 일반 기능·수정 PR은 `develop`을 대상으로 합니다.
- 제목에는 변경 유형과 목적을 적습니다. 기존 PR 제목의 예는
  `[Feat] PR·리뷰 및 운영 배포 Slack 알림 추가`입니다.
- 템플릿에 주요 변경 내용과 검증 결과를 정리하고, 관련 이슈가 있으면 `close #번호`로 연결합니다.
- UI를 변경하면 변경 전후 화면을 첨부하고,
  [검증 절차](../workflows/verification.md)에 따라 영향받는 브라우저와 화면 크기를 확인합니다.
