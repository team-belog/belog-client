import { useMutation } from "@tanstack/react-query";
import { completeSettlement } from "@/features/bill-log/api/billLogApi";
import { track } from "@/lib/amplitude";

export function useCompleteSettlement() {
    return useMutation({
        mutationFn: (settlementRequestId: number) => completeSettlement(settlementRequestId),
        onSuccess: (_, settlementRequestId) => {
            track("Settlement Completed", { settlementRequestId });
        },
    });
}
