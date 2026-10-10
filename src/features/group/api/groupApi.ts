import { api } from "@/lib/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import { ApiResponse } from "@/lib/apiError";
import { GroupMembersResponse } from "@/features/group/types";

export async function getGroupMembers(groupId: number, query?: string): Promise<GroupMembersResponse> {
  const { data } = await api.get<ApiResponse<GroupMembersResponse>>(
    ENDPOINTS.group.members(groupId),
    { params: { query } }
  );
  return data.data;
}
