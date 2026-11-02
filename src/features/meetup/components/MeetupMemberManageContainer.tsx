"use client";

import { useRouter } from "next/navigation";

import MeetupMemberManageView from "@/features/meetup/components/MeetupMemberManageView";
import { useMeetingMemberOptions } from "@/features/meetup/hooks/useMeetingMemberOptions";
import { useUpdateMeetingMembers } from "@/features/meetup/hooks/useUpdateMeetingMembers";

export default function MeetupMemberManageContainer({
  meetingId,
}: {
  meetingId: number;
}) {
  const { data, isPending, isError, error, refetch } =
    useMeetingMemberOptions(meetingId);
  const updateMembers = useUpdateMeetingMembers(meetingId);
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
    <MeetupMemberManageView
      options={data.items}
      isSaving={updateMembers.isPending}
      onSave={(participantMemberIds, options) =>
        updateMembers.mutate(
          { participantMemberIds },
          {
            onSuccess: () => router.back(),
            onError: (error) => options?.onError?.(error.message),
          },
        )
      }
    />
  );
}
