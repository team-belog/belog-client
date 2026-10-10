import { api } from "@/lib/axios";
import { ApiResponse, ApiError } from "@/lib/apiError";
import { ENDPOINTS } from "@/constants/endpoints";
import type {
  GroupDetailData,
  CoverImageContentType,
  CoverImageUploadUrlData,
  CoverImageUploadUrlRequest,
  CreateGroupData,
  CreateGroupRequest,
  GroupListData,
  GroupListParams,
  GroupMembersData,
  PastMeetingsData,
  PastMeetingsParams,
  GroupMembersParams,
  UpdateGroupCoverImageRequest,
} from "@/features/group/types";

export async function getGroups(params: GroupListParams = {}) {
  const { data } = await api.get<ApiResponse<GroupListData>>(
    ENDPOINTS.group.list,
    { params },
  );
  return data.data;
}

export async function createGroup(body: CreateGroupRequest) {
  const { data } = await api.post<ApiResponse<CreateGroupData>>(
    ENDPOINTS.group.create,
    body,
  );
  return data.data;
}

export async function getCoverImageUploadUrl(body: CoverImageUploadUrlRequest) {
  const { data } = await api.post<ApiResponse<CoverImageUploadUrlData>>(
    ENDPOINTS.group.coverImageUploadUrl,
    body,
  );
  return data.data;
}

export async function uploadFileToS3(
  uploadUrl: string,
  file: File,
  contentType: CoverImageContentType,
) {
  const response = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": contentType,
    },
    body: file,
  });

  if (!response.ok) {
    throw new ApiError(
      response.status,
      "S3_UPLOAD_FAILED",
      "이미지 업로드에 실패했습니다.",
    );
  }
}

export async function updateGroupCoverImage(
  groupId: number,
  body: UpdateGroupCoverImageRequest,
) {
  await api.put(ENDPOINTS.group.coverImage(groupId), body);
}

export async function deleteGroup(groupId: number) {
  await api.delete(ENDPOINTS.group.delete(groupId));
}

export async function pinGroup(groupId: number) {
  await api.put(ENDPOINTS.group.pin(groupId));
}

export async function unpinGroup(groupId: number) {
  await api.delete(ENDPOINTS.group.pin(groupId));
}

export async function getGroupDetail(groupId: number) {
  const { data } = await api.get<ApiResponse<GroupDetailData>>(
    ENDPOINTS.group.detail(groupId),
  );
  return data.data;
}

export async function getGroupMembers(
  groupId: number,
  params: GroupMembersParams = {},
) {
  const { data } = await api.get<ApiResponse<GroupMembersData>>(
    ENDPOINTS.group.members(groupId),
    { params },
  );
  return data.data;
}

export async function getPastMeetings(
  groupId: number,
  params: PastMeetingsParams = {},
) {
  const { data } = await api.get<ApiResponse<PastMeetingsData>>(
    ENDPOINTS.group.pastMeetings(groupId),
    { params },
  );
  return data.data;
}
