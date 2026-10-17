import { useMutation, useQueryClient } from "@tanstack/react-query";
import { readNotification } from "@/features/notification/api/notificationApi";
import { notificationKeys } from "@/features/notification/hooks/notificationKeys";
import type { ApiError } from "@/lib/apiError";

export function useReadNotification() {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, number>({
    mutationFn: readNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.list() });
    },
  });
}
