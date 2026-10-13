"use client";

import MeetupRespondView from "@/features/meetup/components/MeetupRespondView";
import { useDatePoll } from "@/features/meetup/hooks/useDatePoll";
import { useDatePollResults } from "@/features/meetup/hooks/useDatePollResults";

export default function MeetupRespondContainer({
  meetingId,
}: {
  meetingId: number;
}) {
  const datePoll = useDatePoll(meetingId);
  // 응답 인원 표시용
  const results = useDatePollResults(meetingId);

  if (datePoll.isPending || results.isPending) {
    return (
      <p className="pretendard-m-15 pt-[25px] text-center text-sub-gray-2">
        불러오는 중...
      </p>
    );
  }

  if (datePoll.isError || results.isError) {
    const error = datePoll.error ?? results.error;
    const handleRetry = () => {
      if (datePoll.isError) datePoll.refetch();
      if (results.isError) results.refetch();
    };

    return (
      <div className="flex flex-col items-center gap-3 pt-[25px]">
        <p className="pretendard-m-15 text-sub-gray-2">{error?.message}</p>
        <button
          type="button"
          onClick={handleRetry}
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
      candidateDateRanges={datePoll.data.candidateDateRanges}
      totalParticipantCount={results.data.totalParticipantCount}
      respondedParticipantCount={results.data.respondedParticipantCount}
    />
  );
}
