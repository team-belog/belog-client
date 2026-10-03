import { api } from "@/lib/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import { ApiResponse } from "@/lib/apiError";
import { BillLogResponse } from "../types";

export async function getBillLogSummary(meetingId: number): Promise<BillLogResponse> {
    const { data } = await api.get<ApiResponse<BillLogResponse>>(
        ENDPOINTS.billLog.getSummary(meetingId)
    );
    return data.data;
}