import { useInfiniteQuery } from "@tanstack/react-query";
import { getGroups } from "@/features/group/api/groupApi";
import { groupKeys } from "@/features/group/hooks/groupKeys";
import type { ApiError } from "@/lib/apiError";
import type { GroupListData, GroupListItemDto } from "@/features/group/types";

export function useGroups() {
  return useInfiniteQuery<
    GroupListData,
    ApiError,
    GroupListItemDto[],
    ReturnType<typeof groupKeys.list>,
    string | undefined
  >({
    queryKey: groupKeys.list(),
    queryFn: ({ pageParam }) => getGroups({ cursor: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (last) => last.nextCursor ?? undefined,
    select: (data) => data.pages.flatMap((page) => page.items),
  });
}
