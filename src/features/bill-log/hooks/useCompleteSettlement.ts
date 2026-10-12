import { useMutation } from "@tanstack/react-query";
import { completeSettlement } from "@/features/bill-log/api/billLogApi";

export function useCompleteSettlement() {
    return useMutation({
        mutationFn: (settlementRequestId: number) => completeSettlement(settlementRequestId),
    });
}
