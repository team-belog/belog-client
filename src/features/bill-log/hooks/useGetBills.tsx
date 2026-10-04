import { useQuery } from "@tanstack/react-query";
import { getBills } from "@/features/bill-log/api/billLogApi";
import { BillsRequest } from "@/features/bill-log/types";

export function useGetBills(params: BillsRequest) {
    return useQuery({
        queryKey: ["bills", params.meetingId],
        queryFn: () => getBills(params),
        enabled: !!params.meetingId,
    });
}
