import { useInfiniteQuery } from "@tanstack/react-query";
import { getNotifications } from "@/features/notification/api/notificationApi";
import { notificationKeys } from "@/features/notification/hooks/notificationKeys";
import type { ApiError } from "@/lib/apiError";
import type {
  NotificationItem,
  NotificationListData,
} from "@/features/notification/types";

export function useNotifications() {
  return useInfiniteQuery<
    NotificationListData,
    ApiError,
    NotificationItem[],
    ReturnType<typeof notificationKeys.list>,
    number | undefined
  >({
    queryKey: notificationKeys.list(),
    queryFn: ({ pageParam }) => getNotifications({ cursor: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (last) =>
      last.hasNext ? (last.nextCursor ?? undefined) : undefined,
    select: (data) => data.pages.flatMap((page) => page.items),
  });
}
