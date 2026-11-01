import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joinGroup } from "@/features/group/api/groupApi";
import { groupKeys } from "@/features/group/hooks/groupKeys";
import type { ApiError } from "@/lib/apiError";
import { track } from "@/lib/amplitude";
import type { JoinGroupData, JoinGroupRequest } from "@/features/group/types";

export function useJoinGroup() {
  const queryClient = useQueryClient();

  return useMutation<JoinGroupData, ApiError, JoinGroupRequest>({
    mutationFn: joinGroup,
    onSuccess: (data) => {
      track("Group Joined", {
        group_id: String(data.groupId),
        join_method: "invite_code",
      });
      queryClient.invalidateQueries({ queryKey: groupKeys.list() });
    },
  });
}
