"use client";

import PreLogView from "@/features/pre-log/components/PreLogView";
import { useDeletePreLogPlan } from "@/features/pre-log/hooks/useDeletePreLogPlan";
import { usePreLogMain } from "@/features/pre-log/hooks/usePreLogMain";
import { useUpdateMeeting } from "@/features/meetup/hooks/useUpdateMeeting";

export default function PreLogContainer({ meetingId }: { meetingId: number }) {
  const { data, isPending, isError, error, refetch } = usePreLogMain(meetingId);
  const updateMeeting = useUpdateMeeting(meetingId);
  const deletePlan = useDeletePreLogPlan(meetingId);

  if (isPending) {
    return (
      <p className="pretendard-m-15 pt-[25px] text-center text-sub-gray-2">
        불러오는 중...
      </p>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 pt-[25px]">
        <p className="pretendard-m-15 text-sub-gray-2">{error.message}</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="pretendard-m-15 text-main-black underline"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <PreLogView
      meeting={data}
      isUpdating={updateMeeting.isPending}
      updateErrorMessage={updateMeeting.error?.message}
      onUpdate={updateMeeting.mutate}
      isDeletingPlan={deletePlan.isPending}
      deletePlanErrorMessage={deletePlan.error?.message}
      onDeletePlan={deletePlan.mutate}
      onCancelDeletePlan={deletePlan.reset}
    />
  );
}
