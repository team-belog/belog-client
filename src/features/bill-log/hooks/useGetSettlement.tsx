import { useQuery } from "@tanstack/react-query";
import { getSettlement } from "../api/billLogApi";
import { SettlementRequests } from "../types";

export function useGetSettlement(params: SettlementRequests) {
    return useQuery({
        queryKey: ["settlement", params.meetingId],
        queryFn: () => getSettlement(params),
        enabled: !!params.meetingId,
    });
}
