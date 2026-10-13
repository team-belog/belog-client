import { useMutation } from "@tanstack/react-query";
import { getUploadUrl } from "@/features/bill-log/api/billLogApi";
import { UploadUrlRequest } from "../types";

export function useGetReceiptImageUploadUrl(meetingId: number) {
    return useMutation({
        mutationFn: (body: UploadUrlRequest) => getUploadUrl(meetingId, body),
    })
}