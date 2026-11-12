import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGroup } from "@/features/group/api/groupApi";
import { groupKeys } from "@/features/group/hooks/groupKeys";
import { homeKeys } from "@/features/home/hooks/homeKeys";
import type { ApiError } from "@/lib/apiError";
import { track } from "@/lib/amplitude";

export function useDeleteGroup() {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, number>({
    mutationFn: deleteGroup,
    onSuccess: (_data, groupId) => {
      track("Group Deleted", { group_id: String(groupId) });
      queryClient.invalidateQueries({ queryKey: groupKeys.list() });
      queryClient.invalidateQueries({ queryKey: homeKeys.all });
    },
  });
}
