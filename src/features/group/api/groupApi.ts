import { api } from "@/lib/axios";
import type { ApiResponse } from "@/lib/apiError";
import { ENDPOINTS } from "@/constants/endpoints";
import type { GroupListData, GroupListParams } from "@/features/group/types";

export async function getGroups(params: GroupListParams = {}) {
  const { data } = await api.get<ApiResponse<GroupListData>>(
    ENDPOINTS.group.list,
    { params },
  );
  return data.data;
}

export async function createGroup(name: string, coverImageObjectKey?: string) {
  const { data } = await api.post<ApiResponse<GroupListData>>(
    ENDPOINTS.group.create,
    { name, coverImageObjectKey },
  );
  return data.data;
}
