import { api } from "@/lib/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import { ApiResponse } from "@/lib/apiError";
import { BillLogResponse } from "../types";
import { type SettlementRequests } from "../types";
import { SettlementResponse } from "../types";


export async function getBillLogSummary(meetingId: number): Promise<BillLogResponse> {
    const { data } = await api.get<ApiResponse<BillLogResponse>>(
        ENDPOINTS.billLog.getSummary(meetingId)
    );
    return data.data;
}

export async function getSettlement(params:SettlementRequests): Promise<SettlementResponse> {
    const { data } = await api.get<ApiResponse<SettlementResponse>>(
        ENDPOINTS.billLog.getSettlement(params.meetingId),
        { params: { cursor: params.cursor, size: params.size } }
    );
    return data.data;
}