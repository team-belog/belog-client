import { useQuery } from "@tanstack/react-query";
import { getGroupMembers } from "@/features/group/api/groupApi";
import type { GroupMembersParams } from "@/features/group/types";

export function useGetGroupMembers(groupId: number, params?: GroupMembersParams) {
  return useQuery({
    queryKey: ["groupMembers", groupId, params],
    queryFn: () => getGroupMembers(groupId, params),
    enabled: !!groupId,
  });
}
