"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient, type InfiniteData } from "@tanstack/react-query";

import PreLogAddView from "@/features/pre-log/components/PreLogAddView";
import { preLogKeys } from "@/features/pre-log/hooks/preLogKeys";
import { useUpdatePreLogPlan } from "@/features/pre-log/hooks/useUpdatePreLogPlan";
import type { PreLogPlan, PreLogPlansData } from "@/features/pre-log/types";

interface PreLogEditContainerProps {
  meetingId: number;
  planId: number;
}

// 계획 상세 조회 API가 없으므로 목록에서 받아 둔 데이터를 재사용
function useCachedPlan(meetingId: number, planId: number) {
  const queryClient = useQueryClient();
  const [plan] = useState<PreLogPlan | undefined>(() => {
    const cached = queryClient.getQueriesData<InfiniteData<PreLogPlansData>>({
      queryKey: preLogKeys.allPlans(meetingId),
    });
    for (const [, data] of cached) {
      const found = data?.pages
        .flatMap((page) => page.items)
        .find((item) => item.planId === planId);
      if (found) return found;
    }
    return undefined;
  });
  return plan;
}

export default function PreLogEditContainer({
  meetingId,
  planId,
}: PreLogEditContainerProps) {
  const router = useRouter();
  const plan = useCachedPlan(meetingId, planId);
  const updatePlan = useUpdatePreLogPlan(planId);

  // 새로고침 등으로 목록 데이터가 없으면 목록에서 다시 들어오도록 안내
  if (!plan) {
    return (
      <div className="flex flex-col items-center gap-3 pt-[25px]">
        <p className="pretendard-m-15 text-sub-gray-2">
          계획 정보를 불러올 수 없어요.
        </p>
        <button
          type="button"
          onClick={() => router.replace(`/pre-log?meetingId=${meetingId}`)}
          className="pretendard-m-15 text-main-black underline"
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <PreLogAddView
      initialPlan={plan}
      // 수정 권한 필드가 없어 작성자에게만 내려오는 삭제 권한으로 판단
      readOnly={!plan.canDelete}
      isSubmitting={updatePlan.isPending}
      errorMessage={updatePlan.error?.message}
      onSubmit={(body) =>
        updatePlan.mutate(body, { onSuccess: () => router.back() })
      }
    />
  );
}
