import { useQuery } from "@tanstack/react-query";
import { getNotificationSettings } from "@/features/notification/api/notificationApi";
import { notificationKeys } from "@/features/notification/hooks/notificationKeys";
import type { ApiError } from "@/lib/apiError";
import type { NotificationSettingsData } from "@/features/notification/types";

export function useNotificationSettings() {
  return useQuery<NotificationSettingsData, ApiError>({
    queryKey: notificationKeys.settings(),
    queryFn: getNotificationSettings,
  });
}
