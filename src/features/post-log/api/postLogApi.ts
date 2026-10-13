import { api } from "@/lib/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import { ApiResponse } from "@/lib/apiError";
import { GetPhotoUploadUrlsResponse, LikePhotoResponse, PhotoMetadataInput, PhotoUploadRequest, PostLogMeetingInfo, PostLogPhotoListRequest, PostLogPhotoListResponse, PostLogTicketDetail, RegisterPhotoMetadataResponse } from "../types";

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

export async function getPhotoUploadUrls(meetingId: number, photos: PhotoUploadRequest[]): Promise<GetPhotoUploadUrlsResponse> {
    const { data } = await api.post<ApiResponse<GetPhotoUploadUrlsResponse>>(
        ENDPOINTS.postLog.getPhotoUploadUrls(meetingId),
        { photos }
    );
    return data.data;
}

export async function uploadPhotoToS3(uploadUrl: string, file: File, headers: Record<string, string>): Promise<void> {
    await fetch(uploadUrl, {
        method: "PUT",
        headers,
        body: file,
    });
}

export async function registerPhotoMetadata(meetingId: number, photos: PhotoMetadataInput[]): Promise<RegisterPhotoMetadataResponse> {
    const { data } = await api.post<ApiResponse<RegisterPhotoMetadataResponse>>(
        ENDPOINTS.postLog.registerPhotoMetadata(meetingId),
        { photos }
    );
    return data.data;
}

export async function likePhoto(photoId: number): Promise<LikePhotoResponse> {
    const { data } = await api.put<ApiResponse<LikePhotoResponse>>(
        ENDPOINTS.postLog.likePhoto(photoId)
    );
    return data.data;
}

export async function unlikePhoto(photoId: number): Promise<LikePhotoResponse> {
    const { data } = await api.delete<ApiResponse<LikePhotoResponse>>(ENDPOINTS.postLog.unlikePhoto(photoId));
    return data.data;
}

export async function createPostLogTicket(meetingId: number, memory: string): Promise<PostLogTicketDetail> {
    const { data } = await api.post<ApiResponse<PostLogTicketDetail>>(
        ENDPOINTS.postLog.createTicket(meetingId),
        { memory }
    );
    return data.data;
}

