import { useMutation } from "@tanstack/react-query";
import { createBill } from "@/features/bill-log/api/billLogApi";
import { CreateBillRequest } from "../types";

export function useCreateBill(meetingId: number) {
    return useMutation({
        mutationFn: (body: CreateBillRequest) => createBill(meetingId, body),
    });
}
