import { useQuery } from "@tanstack/react-query";
import type { GroupDetailData } from "@/features/group/types";
import { ApiError } from "@/lib/apiError";
import { groupKeys } from "@/features/group/hooks/groupKeys";
import { getGroupDetail } from "@/features/group/api/groupApi";

export function useGroupDetail(groupId: number) {
  return useQuery<GroupDetailData, ApiError>({
    queryKey: groupKeys.detail(groupId),
    queryFn: () => getGroupDetail(groupId),
  });
}
