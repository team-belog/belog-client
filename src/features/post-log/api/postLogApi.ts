import { api } from "@/lib/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import { ApiResponse } from "@/lib/apiError";
import { PostLogMeetingInfo, PostLogPhotoListRequest, PostLogPhotoListResponse, PostLogTicketDetail } from "../types";
import { PostLogCalendarResponse } from "@/features/my/types";

export async function getPostLogTicket(ticketId: number): Promise<PostLogTicketDetail> {
    const { data } = await api.get<ApiResponse<PostLogTicketDetail>>(
        ENDPOINTS.postLog.getTicket(ticketId)
    );
    return data.data;
}
export async function getPostLogPhotoList(params: PostLogPhotoListRequest): Promise<PostLogPhotoListResponse> {
    const { data } = await api.get<ApiResponse<PostLogPhotoListResponse>>(
        ENDPOINTS.postLog.getPhotoList(params.meetingId),
        { params: { cursor: params.cursor, size: params.size } }
    );
    return data.data;
}

export async function getPostLogMeetingInfo(meetingId: number): Promise<PostLogMeetingInfo> {
    const { data } = await api.get<ApiResponse<PostLogMeetingInfo>>(
        ENDPOINTS.postLog.getMeetingInfo(meetingId)
    );
    return data.data;
}

export async function savePostLogDraft(meetingId: number, memory: string): Promise<void> {
    await api.put(ENDPOINTS.postLog.saveDraft(meetingId), { memory });
}

export async function createPostLogTicket(meetingId: number, memory: string): Promise<PostLogTicketDetail> {
    const { data } = await api.post<ApiResponse<PostLogTicketDetail>>(
        ENDPOINTS.postLog.createTicket(meetingId),
        { memory }
    );
    return data.data;
}