import { useQuery } from "@tanstack/react-query";
import { getGroupMembers } from "@/features/group/api/groupApi";
import { groupKeys } from "@/features/group/hooks/groupKeys";
import type { ApiError } from "@/lib/apiError";
import type { GroupMembersData } from "@/features/group/types";

export function useGroupMembers(groupId: number, query?: string) {
  const trimmedQuery = query?.trim() || undefined;

  return useQuery<GroupMembersData, ApiError>({
    queryKey: groupKeys.members(groupId, trimmedQuery),
    queryFn: () => getGroupMembers(groupId, { query: trimmedQuery }),
  });
}
