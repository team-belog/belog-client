import { getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const SW_PATH = "/firebase-messaging-sw.js";
// next-pwa의 sw.js(scope "/")와 겹치지 않도록 별도 scope 사용
const SW_SCOPE = "/firebase-cloud-messaging-push-scope";

function getFirebaseApp() {
  return getApps()[0] ?? initializeApp(firebaseConfig);
}

// 푸시 구독은 활성화된 서비스워커에서만 가능
function waitForActivation(registration: ServiceWorkerRegistration) {
  const worker = registration.installing ?? registration.waiting;
  if (registration.active || !worker) return Promise.resolve();

  return new Promise<void>((resolve) => {
    worker.addEventListener("statechange", () => {
      if (worker.state === "activated") resolve();
    });
  });
}

// 알림 권한이 허용된 뒤에 호출 (권한이 없으면 getToken이 직접 권한을 요청함)
// 웹 푸시를 지원하지 않는 환경(iOS Safari 탭 등)에서는 null
export async function getFcmToken(): Promise<string | null> {
  if (!(await isSupported())) return null;

  const registration = await navigator.serviceWorker.register(SW_PATH, {
    scope: SW_SCOPE,
  });
  await waitForActivation(registration);

  return getToken(getMessaging(getFirebaseApp()), {
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    serviceWorkerRegistration: registration,
  });
}
