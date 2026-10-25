import { useInfiniteQuery } from "@tanstack/react-query";
import { getMapPlans } from "@/features/pre-log/api/preLogApi";
import type { MapPlanCategory } from "@/features/pre-log/types";

const PAGE_SIZE = 20;

export function useGetMapPlans(meetingId: number, category?: MapPlanCategory) {
    return useInfiniteQuery({
        queryKey: ["mapPlans", meetingId, category],
        queryFn: ({ pageParam }) =>
            getMapPlans({ meetingId, category, cursor: pageParam, size: PAGE_SIZE }),
        initialPageParam: undefined as string | undefined,
        getNextPageParam: (lastPage) =>
            lastPage.hasNext ? lastPage.nextCursor ?? undefined : undefined,
        staleTime: 0,
    });
}
