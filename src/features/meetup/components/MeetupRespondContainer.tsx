"use client";

import MeetupRespondView from "@/features/meetup/components/MeetupRespondView";
import { useDatePoll } from "@/features/meetup/hooks/useDatePoll";

export default function MeetupRespondContainer({
  meetingId,
}: {
  meetingId: number;
}) {
  const { data, isPending, isError, error, refetch } = useDatePoll(meetingId);

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
    <MeetupRespondView
      meetingId={meetingId}
      candidateDateRanges={data.candidateDateRanges}
    />
  );
}
