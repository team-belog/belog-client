"use client";

import { useRouter } from "next/navigation";

import MeetupDetailView from "@/features/meetup/components/MeetupDetailView";
import { useDeleteMeeting } from "@/features/meetup/hooks/useDeleteMeeting";
import { useEndMeeting } from "@/features/meetup/hooks/useEndMeeting";
import { useMeetingDetail } from "@/features/meetup/hooks/useMeetingDetail";
import { useUpdateMeeting } from "@/features/meetup/hooks/useUpdateMeeting";

export default function MeetupDetailContainer({
  meetingId,
}: {
  meetingId: number;
}) {
  const { data, isPending, isError, error, refetch } =
    useMeetingDetail(meetingId);
  const updateMeeting = useUpdateMeeting(meetingId);
  const deleteMeeting = useDeleteMeeting();
  const endMeeting = useEndMeeting();
  const router = useRouter();

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
    <MeetupDetailView
      meeting={data}
      isUpdating={updateMeeting.isPending}
      updateErrorMessage={updateMeeting.error?.message}
      onUpdate={updateMeeting.mutate}
      isDeleting={deleteMeeting.isPending}
      deleteErrorMessage={deleteMeeting.error?.message}
      onDelete={() =>
        deleteMeeting.mutate(meetingId, {
          onSuccess: () => router.replace(`/group/${data.groupId}`),
        })
      }
      onCancelDelete={deleteMeeting.reset}
      isEnding={endMeeting.isPending}
      endErrorMessage={endMeeting.error?.message}
      onEnd={() =>
        endMeeting.mutate(meetingId, {
          onSuccess: () => router.replace(`/group/${data.groupId}`),
        })
      }
      onCancelEnd={endMeeting.reset}
    />
  );
}
