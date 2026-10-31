import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import {
  likePreLogPlan,
  unlikePreLogPlan,
} from "@/features/pre-log/api/preLogApi";
import { preLogKeys } from "@/features/pre-log/hooks/preLogKeys";
import type { ApiError } from "@/lib/apiError";
import type {
  PreLogPlan,
  PreLogPlanLikeData,
  PreLogPlansData,
} from "@/features/pre-log/types";
import { track } from "@/lib/amplitude";

type PreLogPlansCache = InfiniteData<PreLogPlansData, string | undefined>;

// liked: 변경 후 상태 (true면 좋아요, false면 취소)
type TogglePreLogPlanLikeInput = { planId: number; liked: boolean };

export function useTogglePreLogPlanLike(meetingId: number) {
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
              item.planId === planId ? { ...item, ...patch(item) } : item,
            ),
          })),
        },
    );
  };

  return useMutation<
    PreLogPlanLikeData,
    ApiError,
    TogglePreLogPlanLikeInput,
    { previous: [readonly unknown[], PreLogPlansCache | undefined][] }
  >({
    mutationFn: ({ planId, liked }) =>
      liked ? likePreLogPlan(planId) : unlikePreLogPlan(planId),
    // 응답을 기다리지 않고 하트와 개수를 바로 바꾸고, 실패하면 되돌린다
    onMutate: async ({ planId, liked }) => {
      await queryClient.cancelQueries({ queryKey: plansKey });
      const previous = queryClient.getQueriesData<PreLogPlansCache>({
        queryKey: plansKey,
      });

      updatePlan(planId, (plan) =>
        plan.likedByMe === liked
          ? {}
          : { likedByMe: liked, likeCount: plan.likeCount + (liked ? 1 : -1) },
      );

      return { previous };
    },
    onError: (_error, _input, context) => {
      context?.previous.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
    },
    // 다른 멤버의 좋아요까지 반영된 서버 값으로 맞춤
    onSuccess: ({ planId, likedByMe, likeCount }, { liked }) => {
      track(liked ? "Plan Liked" : "Plan Unliked", { plan_id: String(planId) });
      updatePlan(planId, () => ({ likedByMe, likeCount }));
    },
  });
}
