import { useMutation } from "@tanstack/react-query";
import { sendReminder } from "@/features/bill-log/api/billLogApi";
import { track } from "@/lib/amplitude";

export function useSendReminder() {
    return useMutation({
        mutationFn: (settlementRequestId: number) => sendReminder(settlementRequestId),
        onSuccess: (_, settlementRequestId) => {
            track("Settlement Reminder Sent", { settlement_request_id: String(settlementRequestId) });
        },
    });
}
