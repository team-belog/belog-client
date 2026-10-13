import { useInfiniteQuery } from "@tanstack/react-query";
import { getCompletedTickets } from "@/features/home/api/homeApi";
import type { ApiError } from "@/lib/apiError";
import type { CompletedTicket, CompletedTicketsData } from "@/features/home/types";

export function useGetCompletedTickets(enabled = true) {
    return useInfiniteQuery<
        CompletedTicketsData,
        ApiError,
        CompletedTicket[],
        readonly ["homeCompletedTickets"],
        string | undefined
    >({
        queryKey: ["homeCompletedTickets"],
        queryFn: ({ pageParam }) => getCompletedTickets({ cursor: pageParam }),
        initialPageParam: undefined,
        getNextPageParam: (last) => (last.hasNext ? last.nextCursor ?? undefined : undefined),
        select: (data) => data.pages.flatMap((page) => page.items),
        enabled,
    });
}
