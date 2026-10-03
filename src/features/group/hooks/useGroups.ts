import { useInfiniteQuery } from "@tanstack/react-query";
import { getGroups } from "@/features/group/api/groupApi";
import { groupKeys } from "@/features/group/hooks/groupKeys";
import { toGroupSummary } from "@/features/group/utils/groupMapper";
import type { ApiError } from "@/lib/apiError";
import type { GroupListData } from "@/features/group/types";

export function useGroups() {
  return useInfiniteQuery<
    GroupListData,
    ApiError,
    { groups: ReturnType<typeof toGroupSummary>[] },
    ReturnType<typeof groupKeys.list>,
    string | undefined
  >({
    queryKey: groupKeys.list(),
    queryFn: ({ pageParam }) => getGroups({ cursor: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (last) => last.nextCursor ?? undefined,
    select: (data) => ({
      groups: data.pages.flatMap((page) => page.items.map(toGroupSummary)),
    }),
  });
}
