import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joinGroup } from "@/features/group/api/groupApi";
import { groupKeys } from "@/features/group/hooks/groupKeys";
import type { ApiError } from "@/lib/apiError";
import type { JoinGroupData, JoinGroupRequest } from "@/features/group/types";

export function useJoinGroup() {
  const queryClient = useQueryClient();

  return useMutation<JoinGroupData, ApiError, JoinGroupRequest>({
    mutationFn: joinGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKeys.list() });
    },
  });
}
