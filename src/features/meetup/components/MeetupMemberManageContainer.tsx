"use client";

import MeetupMemberManageView from "@/features/meetup/components/MeetupMemberManageView";
import { useMeetingMemberOptions } from "@/features/meetup/hooks/useMeetingMemberOptions";

export default function MeetupMemberManageContainer({
  meetingId,
}: {
  meetingId: number;
}) {
  const { data, isPending, isError, error, refetch } =
    useMeetingMemberOptions(meetingId);

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

  return <MeetupMemberManageView options={data.items} />;
}
