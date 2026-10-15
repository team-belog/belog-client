import { api } from "@/lib/axios";
import { ApiResponse } from "@/lib/apiError";
import { ENDPOINTS } from "@/constants/endpoints";
import type {
  NotificationListData,
  NotificationListParams,
} from "@/features/notification/types";

export async function getNotifications(params: NotificationListParams = {}) {
  const { data } = await api.get<ApiResponse<NotificationListData>>(
    ENDPOINTS.notification.list,
    { params },
  );
  return data.data;
}
