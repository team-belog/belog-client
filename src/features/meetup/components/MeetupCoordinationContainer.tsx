"use client";

import { useRouter } from "next/navigation";

import MeetupCoordinationView from "@/features/meetup/components/MeetupCoordinationView";
import { useConfirmMeetingDate } from "@/features/meetup/hooks/useConfirmMeetingDate";
import { useDatePollResults } from "@/features/meetup/hooks/useDatePollResults";
import { useSendDatePollReminder } from "@/features/meetup/hooks/useSendDatePollReminder";

export default function MeetupCoordinationContainer({
  meetingId,
  isHost,
}: {
  meetingId: number;
  isHost: boolean;
}) {
  const { data, isPending, isError, error, refetch } =
    useDatePollResults(meetingId);
  const confirmDate = useConfirmMeetingDate(meetingId);
  const sendReminder = useSendDatePollReminder(meetingId);
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
    <MeetupCoordinationView
      isHost={isHost}
      results={data}
      isConfirming={confirmDate.isPending}
      confirmErrorMessage={confirmDate.error?.message}
      isReminding={sendReminder.isPending}
      hasReminded={sendReminder.isSuccess}
      remindErrorMessage={sendReminder.error?.message}
      onRemind={() => sendReminder.mutate()}
      onConfirm={(candidateDateRangeId) =>
        confirmDate.mutate(
          { candidateDateRangeId },
          { onSuccess: () => router.replace(`/meetup/${meetingId}`) },
        )
      }
    />
  );
}
