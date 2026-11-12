import { useQuery } from "@tanstack/react-query";
import { getBillLogSummary } from "../api/billLogApi";
import { billLogKeys } from "./billLogKeys";

export function useGetBillLogSummary(meetingId: number) {
    return useQuery({
        queryKey: billLogKeys.summary(meetingId),
        queryFn: () => getBillLogSummary(meetingId),
        enabled: !!meetingId,
    });
}
