import { useQuery } from "@tanstack/react-query";
import { getGroupMembers } from "@/features/group/api/groupApi";

export function useGetGroupMembers(groupId: number, query?: string) {
  return useQuery({
    queryKey: ["groupMembers", groupId, query],
    queryFn: () => getGroupMembers(groupId, query),
    enabled: !!groupId,
  });
}
