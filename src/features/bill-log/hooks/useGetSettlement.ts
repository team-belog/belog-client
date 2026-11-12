import { useInfiniteQuery } from "@tanstack/react-query";
import { getSettlement } from "../api/billLogApi";
import { billLogKeys } from "./billLogKeys";

export function useGetSettlement(meetingId: number) {
  return useInfiniteQuery({
    queryKey: billLogKeys.settlement(meetingId),
    queryFn: ({ pageParam }) => getSettlement({ meetingId, cursor: pageParam, size: 20 }),
    getNextPageParam: (lastPage) => lastPage.hasNext ? lastPage.nextCursor : undefined,
    initialPageParam: undefined as string | undefined,
    enabled: !!meetingId,
  });
}