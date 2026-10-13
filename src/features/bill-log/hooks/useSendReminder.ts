import { useMutation } from "@tanstack/react-query";
import { sendReminder } from "@/features/bill-log/api/billLogApi";

export function useSendReminder() {
    return useMutation({
        mutationFn: (settlementRequestId: number) => sendReminder(settlementRequestId),
    });
}
