import { useInfiniteQuery } from "@tanstack/react-query";
import { getPreLogPlans } from "@/features/pre-log/api/preLogApi";
import { preLogKeys } from "@/features/pre-log/hooks/preLogKeys";
import type { ApiError } from "@/lib/apiError";
import type {
  PreLogFilter,
  PreLogPlan,
  PreLogPlansData,
  PreLogPlansRequest,
} from "@/features/pre-log/types";

function toFilterParams(filter: PreLogFilter): PreLogPlansRequest {
  if (filter === "all") return {};
  if (filter === "pinned") return { pinnedOnly: true };
  return { category: filter };
}

export function usePreLogPlans(meetingId: number, filter: PreLogFilter) {
  return useInfiniteQuery<
    PreLogPlansData,
    ApiError,
    PreLogPlan[],
    ReturnType<typeof preLogKeys.plans>,
    string | undefined
  >({
    queryKey: preLogKeys.plans(meetingId, filter),
    queryFn: ({ pageParam }) =>
      getPreLogPlans(meetingId, { ...toFilterParams(filter), cursor: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (last) => (last.hasNext ? last.nextCursor ?? undefined : undefined),
    select: (data) => data.pages.flatMap((page) => page.items),
  });
}
