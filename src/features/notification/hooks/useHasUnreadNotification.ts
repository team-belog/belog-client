import { useNotifications } from "@/features/notification/hooks/useNotifications";

export function useHasUnreadNotification() {
  const { data } = useNotifications();
  return data?.some((notification) => !notification.read) ?? false;
}
