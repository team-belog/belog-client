const TUTORIAL_PENDING_KEY = "tutorial-pending";

// 회원가입 직후 홈에서 튜토리얼을 한 번 보여주기 위한 표시
export function markTutorialPending() {
  try {
    localStorage.setItem(TUTORIAL_PENDING_KEY, "true");
  } catch {
    // 저장소를 못 쓰면 튜토리얼 없이 진행
  }
}

export function isTutorialPending() {
  try {
    return localStorage.getItem(TUTORIAL_PENDING_KEY) === "true";
  } catch {
    return false;
  }
}

export function clearTutorialPending() {
  try {
    localStorage.removeItem(TUTORIAL_PENDING_KEY);
  } catch {
    // 지우지 못해도 다음 진입에서 다시 시도
  }
}
