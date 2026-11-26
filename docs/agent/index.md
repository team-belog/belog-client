# Agent Harness

Agent Harness는 사람과 에이전트가 Belog의 같은 개발 기준을 참고할 수 있도록 연결하는 문서와 작업
절차입니다.

## 구성

```text
AGENTS.md
CLAUDE.md
.agents/
  skills/
    <skill>/
      SKILL.md
      agents/openai.yaml
.claude/
  skills -> ../.agents/skills
docs/
  index.md
  agent/
  architecture/
  conventions/
  workflows/
```

| 파일 | 역할 |
| --- | --- |
| `AGENTS.md` | 저장소 기준, 기본 작업 순서와 스킬 선택 |
| `CLAUDE.md` | Claude Code에서 `AGENTS.md`를 가져오는 진입점 |
| `SKILL.md` | 작업별 확인 순서와 완료 조건 |
| `.claude/skills` | 공통 스킬 폴더 전체를 Claude Code에 연결하는 심볼릭 링크 |
| `agents/openai.yaml` | Codex의 스킬 표시 이름, 설명과 기본 호출 프롬프트 |
| `docs/` | 프로젝트 구조, 컨벤션과 개발 절차 |

## 스킬

| 스킬 | 사용하는 경우 |
| --- | --- |
| `page-feature-workflow` | 페이지, 레이아웃이나 사용자 진입 경로를 변경할 때 |
| `domain-feature-workflow` | 기능 내부의 화면, 훅, 상태 또는 다단계 흐름을 변경할 때 |
| `shared-component-workflow` | 공용 UI와 레이아웃의 사용 계약을 변경할 때 |
| `api-integration-workflow` | 백엔드 요청, 캐시 갱신, 인증, 파일 업로드를 연결할 때 |
| `architecture-review` | 파일 배치, 기능 간 의존 방향과 공통화 범위를 검토할 때 |
| `verify-frontend` | 변경 범위에 맞춰 정적 검사와 동작을 확인할 때 |

저장소 탐색과 작업 범위 결정은 공통 작업 흐름에 포함합니다.
시작 기준은 `AGENTS.md`, 상세 순서는 [기능 개발](../workflows/feature-development.md)에서 확인합니다.
한 작업에 페이지와 API 변경이 함께 있으면 관련 스킬을 조합합니다.

## 사용 방법

일반 작업은 자연어로 요청합니다. 관련 이슈, 대상 화면과 기대 동작을 함께 주면 에이전트가 범위를
확인하기 쉽습니다.

```text
그룹 상세에 모임 목록 필터를 추가해 줘
현재 변경에서 공용 UI와 기능의 경계를 리뷰해 줘
PR 전에 변경한 결제 등록 흐름을 검증해 줘
```

Codex에서는 `$스킬명`으로 적용할 절차를 지정할 수 있습니다.

```text
$page-feature-workflow 그룹 상세 화면에 새 탭을 추가해 줘
$api-integration-workflow Post-log 사진 삭제를 API에 연결해 줘
$architecture-review 이 변경의 기능 경계와 의존 방향을 검토해 줘
$verify-frontend 이 변경을 PR 전에 검증해 줘
```

Claude Code에서는 `/스킬명`을 사용합니다. 스킬 본문은 Codex와 같은 파일을 읽습니다.

```text
/page-feature-workflow 그룹 상세 화면에 새 탭을 추가해 줘
/verify-frontend 이 변경을 PR 전에 검증해 줘
```

Claude Code는 `CLAUDE.md`의 `@AGENTS.md`를 통해 공통 지침을 가져옵니다.
프로젝트 규칙은 `AGENTS.md`, 스킬 본문은 `.agents/skills`에서 수정합니다.
스킬 폴더 전체를 연결하므로 스킬을 추가하거나 제거해도 링크를 바꿀 필요가 없습니다.
새 세션에서 `/memory`로 지침 파일을, `/` 메뉴에서 프로젝트 스킬을 확인할 수 있습니다.
가져오기와 스킬 연결 방식은 [Claude Code 지침 문서](https://code.claude.com/docs/en/memory#share-one-file-with-other-coding-tools)와
[스킬 문서](https://code.claude.com/docs/en/skills#choose-where-skills-load)를 따릅니다.

저장소 루트에서 에이전트를 사용합니다. 지침을 직접 지정하는 도구에는 [AGENTS.md](../../AGENTS.md)를
작업 맥락으로 제공합니다. 스킬을 직접 호출하는 기능이 없다면 작업에 해당하는 `SKILL.md`도 함께
지정할 수 있습니다.

## 기준 문서와 유지보수

프로젝트 사실과 세부 규칙은 [개발 문서](../index.md)에서 확인합니다. 스킬은 그 기준을 실제 작업에서
어떻게 적용할지 안내합니다. 실제 구조, 명령 또는 팀 절차가 바뀌면
[유지보수 가이드](maintenance.md)에 따라 해당 문서와 스킬을 검토합니다.

스킬에 적힌 파일 경로는 저장소 루트를 기준으로 읽습니다.
참고 문서 중 현재 작업에 필요한 부분을 확인하고 기존 구현과 대조합니다.
