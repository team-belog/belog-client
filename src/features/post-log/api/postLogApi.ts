import { api } from "@/lib/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import { ApiResponse } from "@/lib/apiError";
import { PostLogPhotoListRequest, PostLogPhotoListResponse, PostLogTicketDetail } from "../types";
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