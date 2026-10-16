import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import { likePreLogPlan } from "@/features/pre-log/api/preLogApi";
import { preLogKeys } from "@/features/pre-log/hooks/preLogKeys";
import type { ApiError } from "@/lib/apiError";
import type {
  LikePreLogPlanData,
  PreLogPlan,
  PreLogPlansData,
} from "@/features/pre-log/types";

type PreLogPlansCache = InfiniteData<PreLogPlansData, string | undefined>;

export function useLikePreLogPlan(meetingId: number) {
  const queryClient = useQueryClient();
  const plansKey = preLogKeys.allPlans(meetingId);

  // 필터 탭마다 캐시가 따로 있으므로 해당 계획을 모두 갱신
  const updatePlan = (
    planId: number,
    patch: (plan: PreLogPlan) => Partial<PreLogPlan>,
  ) => {
    queryClient.setQueriesData<PreLogPlansCache>(
      { queryKey: plansKey },
      (old) =>
        old && {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            items: page.items.map((item) =>
              item.planId === planId
                ? { ...item, ...patch(item) }
                : item,
            ),
          })),
        },
    );
  };

  return useMutation<
    LikePreLogPlanData,
    ApiError,
    number,
    { previous: [readonly unknown[], PreLogPlansCache | undefined][] }
  >({
    mutationFn: (planId) => likePreLogPlan(planId),
    // 응답을 기다리지 않고 하트를 바로 채우고, 실패하면 되돌린다
    onMutate: async (planId) => {
      await queryClient.cancelQueries({ queryKey: plansKey });
      const previous = queryClient.getQueriesData<PreLogPlansCache>({
        queryKey: plansKey,
      });

      updatePlan(planId, (plan) =>
        plan.likedByMe ? {} : { likedByMe: true, likeCount: plan.likeCount + 1 },
      );

      return { previous };
    },
    onError: (_error, _planId, context) => {
      context?.previous.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
    },
    // 다른 멤버의 좋아요까지 반영된 서버 값으로 맞춤
    onSuccess: ({ planId, likedByMe, likeCount }) => {
      updatePlan(planId, () => ({ likedByMe, likeCount }));
    },
  });
}
