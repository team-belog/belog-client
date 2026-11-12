import * as amplitude from "@amplitude/analytics-browser";

let initialized = false;

export function initAmplitude() {
  const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
  if (initialized || !apiKey || typeof window === "undefined") return;

  amplitude.init(apiKey, {
    autocapture: false,
    minIdLength: 1,
  });
  initialized = true;
}

// 자식 컴포넌트 effect가 Providers의 init보다 먼저 실행될 수 있어 호출 시점에 보장
function ensureInitialized() {
  initAmplitude();
  return initialized;
}

export function track(event: string, properties?: Record<string, unknown>) {
  if (!ensureInitialized()) return;
  amplitude.track(event, properties);
}

export function setAmplitudeUserId(userId: string | number) {
  if (!ensureInitialized()) return;
  amplitude.setUserId(String(userId));
}

export function setUserProperty(
  properties: Record<string, string | number | boolean>,
) {
  if (!ensureInitialized()) return;
  const identify = new amplitude.Identify();
  Object.entries(properties).forEach(([key, value]) => {
    identify.set(key, value);
  });
  amplitude.identify(identify);
}

// 로그아웃 시 user_id와 device_id 초기화
export function resetAmplitude() {
  if (!ensureInitialized()) return;
  amplitude.reset();
}
