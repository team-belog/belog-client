import { useMutation } from "@tanstack/react-query";
import { createBill } from "@/features/bill-log/api/billLogApi";
import { CreateBillRequest } from "../types";
import { track } from "@/lib/amplitude";

export function useCreateBill(meetingId: number) {
    return useMutation({
        mutationFn: (body: CreateBillRequest) => createBill(meetingId, body),
        onSuccess: (_, body) => {
            track("Expense Created", { meetingId, itemCount: body.items?.length });
        },
    });
}
