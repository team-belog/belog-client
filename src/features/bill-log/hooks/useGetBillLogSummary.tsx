import { useQuery } from "@tanstack/react-query";
import { getBillLogSummary } from "../api/billLogApi";

export function useGetBillLogSummary(meetingId: number) {
    return useQuery({
        queryKey: ["billLog", meetingId],
        queryFn: () => getBillLogSummary(meetingId),
        enabled: !!meetingId,
    });
}
