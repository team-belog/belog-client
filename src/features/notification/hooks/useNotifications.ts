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
    // 읽은 알림은 화면에서 숨김 (서버는 읽음 여부와 상관없이 내려줌)
    select: (data) =>
      data.pages.flatMap((page) => page.items).filter((item) => !item.read),
  });
}
