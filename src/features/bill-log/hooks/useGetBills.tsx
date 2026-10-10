import { useInfiniteQuery } from "@tanstack/react-query";
import { getBills } from "@/features/bill-log/api/billLogApi";

export function useGetBills(meetingId: number) {
  return useInfiniteQuery({
    queryKey: ["bills", meetingId],
    queryFn: ({ pageParam }) => getBills({ meetingId, cursorDate: pageParam, size: 20 }),
    getNextPageParam: (lastPage) => lastPage.hasNext ? lastPage.nextCursorDate : undefined,
    initialPageParam: undefined as string | undefined,
    enabled: !!meetingId,
  });
}