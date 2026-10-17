import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMeeting } from "@/features/meetup/api/meetupApi";
import { groupKeys } from "@/features/group/hooks/groupKeys";
import type { ApiError } from "@/lib/apiError";

export function useDeleteMeeting() {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, number>({
    mutationFn: deleteMeeting,
    onSuccess: () => {
      // 그룹 홈의 조율 중·진행 중·지난 만남 목록에서 삭제된 만남을 제거
      queryClient.invalidateQueries({ queryKey: groupKeys.all });
    },
  });
}
