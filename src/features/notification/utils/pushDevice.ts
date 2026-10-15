import { registerDevice } from "@/features/notification/api/notificationApi";
import { getFcmToken } from "@/lib/firebase";

// 브라우저(앱 설치) 단위로 고정된 기기 ID
const DEVICE_ID_KEY = "belog-push-device-id";

function getOrCreateDeviceId() {
  try {
    const saved = localStorage.getItem(DEVICE_ID_KEY);
    if (saved) return saved;

    const deviceId = crypto.randomUUID();
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
    return deviceId;
  } catch {
    // 저장소를 쓸 수 없으면 이번 실행에서만 쓰는 ID로 등록
    return crypto.randomUUID();
  }
}

// iOS Safari 탭처럼 웹 푸시를 지원하지 않는 환경에서는 false
export function isPushSupported() {
  return "Notification" in window && "serviceWorker" in navigator;
}

// 권한이 허용된 경우에만 FCM 토큰을 받아 서버에 기기 등록
export async function registerPushDevice() {
  if (!isPushSupported() || Notification.permission !== "granted") return;

  const fcmToken = await getFcmToken();
  if (!fcmToken) return;

  await registerDevice(getOrCreateDeviceId(), { fcmToken });
}
