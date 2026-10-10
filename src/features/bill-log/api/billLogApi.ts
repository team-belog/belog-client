import { api } from "@/lib/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import { ApiResponse } from "@/lib/apiError";
import { BillLogResponse, BillsRequest, BillsResponse, BillDetailResponse, UploadUrlResponse, UploadUrlRequest, ReceiptAnalysisRequest, ReceiptAnalysisResponse, CreateBillRequest } from "../types";
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

export async function getBills(params:BillsRequest): Promise<BillsResponse> {
    const { data } = await api.get<ApiResponse<BillsResponse>>(
        ENDPOINTS.billLog.getBills(params.meetingId),
        { params: { cursor: params.cursorDate, size: params.size } }
    );
    return data.data;
}

export async function getBillDetail(billId: number): Promise<BillDetailResponse> {
    const { data } = await api.get<ApiResponse<BillDetailResponse>>(
        ENDPOINTS.billLog.getBillDetail(billId)
    );
    return data.data;
}

export async function getUploadUrl(meetingId: number, body: UploadUrlRequest): Promise<UploadUrlResponse> {
    const { data } = await api.post<ApiResponse<UploadUrlResponse>>(
        ENDPOINTS.billLog.getUploadUrl(meetingId),
        body
    );
    return data.data;
}

export async function analyzeReceipt(meetingId: number, body: ReceiptAnalysisRequest): Promise<ReceiptAnalysisResponse> {
    const { data } = await api.post<ApiResponse<ReceiptAnalysisResponse>>(
        ENDPOINTS.billLog.analyzeReceipt(meetingId),
        body
    );
    return data.data;
}

export async function createBill(meetingId: number, body: CreateBillRequest): Promise<void> {
    await api.post(ENDPOINTS.billLog.createBill(meetingId), body);
}