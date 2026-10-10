import { useInfiniteQuery } from "@tanstack/react-query";
import { getPastMeetings } from "@/features/group/api/groupApi";
import { groupKeys } from "@/features/group/hooks/groupKeys";
import type { ApiError } from "@/lib/apiError";
import type { PastMeetingDto, PastMeetingsData } from "@/features/group/types";

export function usePastMeetings(groupId: number) {
  return useInfiniteQuery<
    PastMeetingsData,
    ApiError,
    PastMeetingDto[],
    ReturnType<typeof groupKeys.pastMeetings>,
    number | undefined
  >({
    queryKey: groupKeys.pastMeetings(groupId),
    queryFn: ({ pageParam }) => getPastMeetings(groupId, { cursor: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (last) => last.nextCursor ?? undefined,
    select: (data) => data.pages.flatMap((page) => page.items),
  });
}
