import { useMutation } from "@tanstack/react-query";
import { analyzeReceipt } from "../api/billLogApi";
import type { ReceiptAnalysisRequest } from "../types";
import { track } from "@/lib/amplitude";

export function useAnalyzeReceipt(meetingId: number) {
    return useMutation({
        mutationFn: (body: ReceiptAnalysisRequest) => analyzeReceipt(meetingId, body),
        onSuccess: () => {
            track("Receipt OCR Completed", { meetingId });
        },
    });
}
