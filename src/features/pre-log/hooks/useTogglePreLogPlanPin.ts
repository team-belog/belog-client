import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import {
  pinPreLogPlan,
  unpinPreLogPlan,
} from "@/features/pre-log/api/preLogApi";
import { preLogKeys } from "@/features/pre-log/hooks/preLogKeys";
import type { ApiError } from "@/lib/apiError";
import type { PreLogPlansData } from "@/features/pre-log/types";

type PreLogPlansCache = InfiniteData<PreLogPlansData, string | undefined>;

// pinned: 변경 후 상태 (true면 고정, false면 해제)
type TogglePreLogPlanPinInput = { planId: number; pinned: boolean };

export function useTogglePreLogPlanPin(meetingId: number) {
  const queryClient = useQueryClient();
  const plansKey = preLogKeys.allPlans(meetingId);

  return useMutation<
    void,
    ApiError,
    TogglePreLogPlanPinInput,
    { previous: [readonly unknown[], PreLogPlansCache | undefined][] }
  >({
    mutationFn: ({ planId, pinned }) =>
      pinned ? pinPreLogPlan(planId) : unpinPreLogPlan(planId),
    // 응답을 기다리지 않고 핀 상태를 바로 바꾸고, 실패하면 되돌린다
    onMutate: async ({ planId, pinned }) => {
      await queryClient.cancelQueries({ queryKey: plansKey });
      const previous = queryClient.getQueriesData<PreLogPlansCache>({
        queryKey: plansKey,
      });

      queryClient.setQueriesData<PreLogPlansCache>(
        { queryKey: plansKey },
        (old) =>
          old && {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              items: page.items.map((item) =>
                item.planId === planId ? { ...item, pinned } : item,
              ),
            })),
          },
      );

      return { previous };
    },
    onError: (_error, _input, context) => {
      context?.previous.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
    },
    // 고정 계획이 맨 앞으로 정렬되고 고정 탭 구성도 바뀌므로 다시 조회
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: plansKey });
    },
  });
}
