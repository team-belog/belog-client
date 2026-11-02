import { useInfiniteQuery } from "@tanstack/react-query";
import { getActiveMeetings } from "@/features/home/api/homeApi";
import { homeKeys } from "@/features/home/hooks/homeKeys";
import type { ApiError } from "@/lib/apiError";
import type { ActiveMeeting, ActiveMeetingsData } from "@/features/home/types";

export function useGetActiveMeetings(query: string) {
    return useInfiniteQuery<
        ActiveMeetingsData,
        ApiError,
        ActiveMeeting[],
        ReturnType<typeof homeKeys.activeMeetings>,
        string | undefined
    >({
        queryKey: homeKeys.activeMeetings(query),
        queryFn: ({ pageParam }) =>
            getActiveMeetings({ query: query || undefined, cursor: pageParam }),
        initialPageParam: undefined,
        getNextPageParam: (last) => (last.hasNext ? last.nextCursor ?? undefined : undefined),
        select: (data) => data.pages.flatMap((page) => page.items),
    });
}
