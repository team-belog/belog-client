import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePreLogPlan } from "@/features/pre-log/api/preLogApi";
import { preLogKeys } from "@/features/pre-log/hooks/preLogKeys";
import type {
  UpdatePreLogPlanData,
  UpdatePreLogPlanRequest,
} from "@/features/pre-log/types";
import type { ApiError } from "@/lib/apiError";
import { track } from "@/lib/amplitude";

export function useUpdatePreLogPlan(planId: number) {
  const queryClient = useQueryClient();

  return useMutation<UpdatePreLogPlanData, ApiError, UpdatePreLogPlanRequest>({
    mutationFn: (body) => updatePreLogPlan(planId, body),
    onSuccess: (data) => {
      track("Plan Updated", { plan_id: String(planId), meeting_id: String(data.meetingId) });
      // 카테고리가 바뀌면 다른 필터 탭으로 옮겨가므로 해당 만남의 목록을 모두 갱신
      queryClient.invalidateQueries({
        queryKey: preLogKeys.allPlans(data.meetingId),
      });
      queryClient.invalidateQueries({ queryKey: preLogKeys.memoDetail(planId) });
      queryClient.invalidateQueries({ queryKey: ["mapPlans", data.meetingId] });
    },
  });
}
