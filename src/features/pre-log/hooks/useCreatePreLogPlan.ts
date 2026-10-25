import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPreLogPlan } from "@/features/pre-log/api/preLogApi";
import { preLogKeys } from "@/features/pre-log/hooks/preLogKeys";
import type {
  CreatePreLogPlanData,
  CreatePreLogPlanRequest,
} from "@/features/pre-log/types";
import type { ApiError } from "@/lib/apiError";

export function useCreatePreLogPlan(meetingId: number) {
  const queryClient = useQueryClient();

  return useMutation<CreatePreLogPlanData, ApiError, CreatePreLogPlanRequest>({
    mutationFn: (body) => createPreLogPlan(meetingId, body),
    onSuccess: () => {
      // 새 계획이 어느 필터 탭에 들어갈지 모르므로 해당 만남의 목록을 모두 갱신
      queryClient.invalidateQueries({ queryKey: preLogKeys.allPlans(meetingId) });
      queryClient.invalidateQueries({ queryKey: ["mapPlans", meetingId] });
    },
  });
}
