"use client";

import { useRouter } from "next/navigation";

import PreLogMemoDetailView from "@/features/pre-log/components/PreLogMemoDetailView";
import { usePreLogMemoDetail } from "@/features/pre-log/hooks/usePreLogMemoDetail";
import { useUpdatePreLogPlan } from "@/features/pre-log/hooks/useUpdatePreLogPlan";

interface PreLogMemoDetailContainerProps {
  meetingId: number;
  planId: number;
}

export default function PreLogMemoDetailContainer({
  meetingId,
  planId,
}: PreLogMemoDetailContainerProps) {
  const router = useRouter();
  const { data, isPending, isError, error, refetch } = usePreLogMemoDetail(planId);
  const updatePlan = useUpdatePreLogPlan(planId);

  if (isPending) {
    return (
      <p className="pretendard-m-15 pt-[25px] text-center text-sub-gray-2">
        불러오는 중...
      </p>
    );
  }

  // 위치 계획 ID처럼 상세 조회를 지원하지 않는 경우도 서버 메시지를 그대로 안내
  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 pt-[25px]">
        <p className="pretendard-m-15 text-sub-gray-2">{error.message}</p>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => refetch()}
            className="pretendard-m-15 text-main-black underline"
          >
            다시 시도
          </button>
          <button
            type="button"
            onClick={() => router.replace(`/pre-log?meetingId=${meetingId}`)}
            className="pretendard-m-15 text-main-black underline"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <PreLogMemoDetailView
      memo={data}
      isSubmitting={updatePlan.isPending}
      errorMessage={updatePlan.error?.message}
      onSubmit={updatePlan.mutate}
      onCancelEdit={updatePlan.reset}
    />
  );
}
