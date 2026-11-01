"use client";

import MeetupMemberManageView from "@/features/meetup/components/MeetupMemberManageView";
import { useMeetingDetail } from "@/features/meetup/hooks/useMeetingDetail";
import { useMeetingMembers } from "@/features/meetup/hooks/useMeetingMembers";

export default function MeetupMemberManageContainer({
  meetingId,
}: {
  meetingId: number;
}) {
  // 추가할 멤버 후보를 그룹 멤버에서 찾으므로 groupId가 필요
  const meeting = useMeetingDetail(meetingId);
  const members = useMeetingMembers(meetingId);

  if (meeting.isPending || members.isPending) {
    return (
      <p className="pretendard-m-15 pt-[25px] text-center text-sub-gray-2">
        불러오는 중...
      </p>
    );
  }

  if (meeting.isError || members.isError) {
    const error = meeting.error ?? members.error;
    return (
      <div className="flex flex-col items-center gap-3 pt-[25px]">
        <p className="pretendard-m-15 text-sub-gray-2">{error?.message}</p>
        <button
          type="button"
          onClick={() => {
            meeting.refetch();
            members.refetch();
          }}
          className="pretendard-m-15 text-main-black underline"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <MeetupMemberManageView
      groupId={meeting.data.groupId}
      members={members.data.items}
    />
  );
}
