import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGroup } from "@/features/group/api/groupApi";
import { groupKeys } from "@/features/group/hooks/groupKeys";
import { homeKeys } from "@/features/home/hooks/homeKeys";
import type { ApiError } from "@/lib/apiError";

export function useDeleteGroup() {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, number>({
    mutationFn: deleteGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKeys.list() });
      queryClient.invalidateQueries({ queryKey: homeKeys.all });
    },
  });
}
