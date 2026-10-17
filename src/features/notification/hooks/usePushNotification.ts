import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { notificationKeys } from "@/features/notification/hooks/notificationKeys";
import { useReadNotification } from "@/features/notification/hooks/useReadNotification";

// public/firebase-messaging-sw.js가 보내는 메시지
type PushWorkerMessage =
  | { type: "PUSH_RECEIVED" }
  | { type: "NOTIFICATION_CLICK"; path: string; notificationId: number | null };

const NOTIFICATION_ID_PARAM = "notificationId";

export function usePushNotification() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: readNotification } = useReadNotification();

  // 푸시 클릭으로 새 창이 열린 경우 URL의 notificationId로 읽음 처리
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const notificationId = Number(params.get(NOTIFICATION_ID_PARAM));
    if (!notificationId) return;

    readNotification(notificationId);
    params.delete(NOTIFICATION_ID_PARAM);
    const query = params.toString();
    router.replace(`${window.location.pathname}${query ? `?${query}` : ""}`);
  }, [readNotification, router]);

  // 앱이 열려 있을 때 푸시 수신·클릭 처리
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const handleMessage = (event: MessageEvent<PushWorkerMessage>) => {
      const message = event.data;

      if (message?.type === "PUSH_RECEIVED") {
        queryClient.invalidateQueries({ queryKey: notificationKeys.list() });
      }

      if (message?.type === "NOTIFICATION_CLICK") {
        if (message.notificationId) readNotification(message.notificationId);
        router.push(message.path);
      }
    };

    navigator.serviceWorker.addEventListener("message", handleMessage);
    return () =>
      navigator.serviceWorker.removeEventListener("message", handleMessage);
  }, [queryClient, readNotification, router]);
}
