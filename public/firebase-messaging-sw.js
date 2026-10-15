// FCM 웹 푸시용 서비스워커
// - next-pwa의 sw.js(scope "/")와 겹치지 않도록 별도 scope로 등록함 (src/lib/firebase.ts)
// TODO: 푸시 수신(push)·클릭(notificationclick) 처리

self.addEventListener("install", () => self.skipWaiting());
