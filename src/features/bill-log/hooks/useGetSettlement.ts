import { useInfiniteQuery } from "@tanstack/react-query";
import { getSettlement } from "../api/billLogApi";

export function useGetSettlement(meetingId: number) {
  return useInfiniteQuery({
    queryKey: ["settlement", meetingId],
    queryFn: ({ pageParam }) => getSettlement({ meetingId, cursor: pageParam, size: 20 }),
    getNextPageParam: (lastPage) => lastPage.hasNext ? lastPage.nextCursor : undefined,
    initialPageParam: undefined as string | undefined,
    enabled: !!meetingId,
  });
}