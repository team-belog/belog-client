// FCM 웹 푸시용 서비스워커
// - next-pwa의 sw.js(scope "/")와 겹치지 않도록 별도 scope로 등록함 (src/lib/firebase.ts)
// - 푸시를 직접 처리하므로 Firebase SDK와 firebaseConfig가 필요 없음

// src/features/notification/utils/getNotificationPath.ts와 동일하게 유지
function getNotificationPath(targetType, targetId) {
  if (targetType === "HOME") return "/";
  if (targetId === null) return "/notification";

  switch (targetType) {
    case "GROUP_HOME":
      return `/group/${targetId}`;
    case "DATE_POLL_RESPONSE":
      return `/meetup/${targetId}/respond`;
    case "DATE_POLL_STATUS":
      return `/meetup/${targetId}/status?role=host`;
    case "MEETING_DETAIL":
      return `/meetup/${targetId}`;
    case "PRE_LOG":
      return `/pre-log?meetingId=${targetId}`;
    case "BILL_LOG":
      return `/bill-log?meetingId=${targetId}`;
    case "POST_LOG":
      return `/post-log?meetingId=${targetId}`;
    default:
      return "/notification";
  }
}

function getWindowClients() {
  return self.clients.matchAll({ type: "window", includeUncontrolled: true });
}

self.addEventListener("install", () => self.skipWaiting());

// payload: { notification: { title, body }, data: { notificationId, type, targetType, targetId } }
self.addEventListener("push", (event) => {
  if (!event.data) return;

  let payload;
  try {
    payload = event.data.json();
  } catch {
    return;
  }

  const notification = payload.notification ?? {};
  const data = payload.data ?? {};

  event.waitUntil(
    (async () => {
      await self.registration.showNotification(notification.title ?? "BELOG", {
        body: notification.body,
        icon: "/icons/icon-192x192.png",
        // 서버가 같은 푸시를 두 번 보내도 하나로 합쳐짐
        tag: data.notificationId || undefined,
        data,
      });

      // 열려 있는 화면의 알림 목록 갱신용
      const clients = await getWindowClients();
      clients.forEach((client) => client.postMessage({ type: "PUSH_RECEIVED" }));
    })(),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  // FCM data 값은 모두 문자열 (대상이 없으면 targetId는 "")
  const data = event.notification.data ?? {};
  const notificationId = Number(data.notificationId) || null;
  const targetId = data.targetId ? Number(data.targetId) : null;
  const path = getNotificationPath(data.targetType, targetId);

  event.waitUntil(
    (async () => {
      const [client] = await getWindowClients();

      // 열려 있는 창이 있으면 앱이 이동·읽음 처리 (usePushNotification)
      if (client) {
        await client.focus();
        client.postMessage({ type: "NOTIFICATION_CLICK", path, notificationId });
        return;
      }

      // 새 창은 URL의 notificationId로 읽음 처리
      const url = new URL(path, self.location.origin);
      if (notificationId) url.searchParams.set("notificationId", String(notificationId));
      await self.clients.openWindow(url.href);
    })(),
  );
});
