import { api } from "@/lib/axios";
import { ApiResponse } from "@/lib/apiError";
import { ENDPOINTS } from "@/constants/endpoints";
import type {
  NotificationListData,
  NotificationListParams,
  NotificationSettingsData,
} from "@/features/notification/types";

export async function getNotifications(params: NotificationListParams = {}) {
  const { data } = await api.get<ApiResponse<NotificationListData>>(
    ENDPOINTS.notification.list,
    { params },
  );
  return data.data;
}

// 이미 읽은 알림도 204로 성공
export async function readNotification(notificationId: number) {
  await api.put(ENDPOINTS.notification.read(notificationId));
}

export async function getNotificationSettings() {
  const { data } = await api.get<ApiResponse<NotificationSettingsData>>(
    ENDPOINTS.notification.settings,
  );
  return data.data;
}
