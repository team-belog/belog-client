const PWA_INSTALL_SNOOZED_AT_KEY = "pwa-install-snoozed-at";
const SNOOZE_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

// "7일 뒤 다시보기"를 누른 시각 저장
export function snoozePwaInstall() {
  try {
    localStorage.setItem(PWA_INSTALL_SNOOZED_AT_KEY, String(Date.now()));
  } catch {
    // 저장소를 못 쓰면 다음 홈 진입 때 다시 노출
  }
}

export function isPwaInstallSnoozed() {
  try {
    const snoozedAt = Number(localStorage.getItem(PWA_INSTALL_SNOOZED_AT_KEY));
    if (!snoozedAt) return false;
    return Date.now() - snoozedAt < SNOOZE_DURATION_MS;
  } catch {
    return false;
  }
}
