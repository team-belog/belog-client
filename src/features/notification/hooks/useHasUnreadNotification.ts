import { useNotifications } from "@/features/notification/hooks/useNotifications";

// 안 읽은 알림 개수 API가 없어 불러온 목록(첫 페이지 최신 20개) 기준으로 판단
// TODO: 서버에 안 읽은 알림 개수 API가 생기면 교체
export function useHasUnreadNotification() {
  const { data } = useNotifications();
  return (data?.length ?? 0) > 0;
}
