import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePreLogPlan } from "@/features/pre-log/api/preLogApi";
import { preLogKeys } from "@/features/pre-log/hooks/preLogKeys";
import type { ApiError } from "@/lib/apiError";

export function useDeletePreLogPlan(meetingId: number) {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, number>({
    mutationFn: (planId) => deletePreLogPlan(planId),
    onSuccess: () => {
      // 전체·고정·카테고리 탭 어디에나 있을 수 있으므로 해당 만남의 목록을 모두 갱신
      queryClient.invalidateQueries({ queryKey: preLogKeys.allPlans(meetingId) });
    },
  });
}
