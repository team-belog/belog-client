import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNotificationSettings } from "@/features/notification/api/notificationApi";
import { notificationKeys } from "@/features/notification/hooks/notificationKeys";
import type { ApiError } from "@/lib/apiError";
import type { NotificationSettingsData } from "@/features/notification/types";

export function useUpdateNotificationSettings() {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    ApiError,
    NotificationSettingsData,
    { previous?: NotificationSettingsData }
  >({
    mutationFn: updateNotificationSettings,
    // 응답을 기다리지 않고 토글을 바로 바꾸고, 실패하면 되돌린다
    onMutate: async (next) => {
      await queryClient.cancelQueries({ queryKey: notificationKeys.settings() });
      const previous = queryClient.getQueryData<NotificationSettingsData>(
        notificationKeys.settings(),
      );

      queryClient.setQueryData<NotificationSettingsData>(
        notificationKeys.settings(),
        next,
      );

      return { previous };
    },
    onError: (_error, _next, context) => {
      if (context?.previous) {
        queryClient.setQueryData(notificationKeys.settings(), context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.settings() });
    },
  });
}
