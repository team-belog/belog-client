"use client";

import type { GroupMeetingDto } from "@/features/group/types";

// 만남 정원은 응답에 없어 고정값 사용
const MEETUP_MEMBER_LIMIT = 15;

interface GroupMeetupCardProps {
  meeting: GroupMeetingDto;
  actionLabel: string;
  onAction?: () => void;
}

export default function GroupMeetupCard({
  meeting,
  actionLabel,
  onAction,
}: GroupMeetupCardProps) {
  const { name, participants, participantCount } = meeting;

  return (
    <div className="mx-4 flex flex-col gap-[10px]">
      <div className="flex flex-col gap-[15px] rounded-[12px] bg-main-cool-gray px-[13px] py-[21px]">
        <p className="pretendard-sb-16 text-main-black">{name}</p>

        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-[5px]">
            {participants.map(({ nickname, isMeetingOwner }) => (
              <span
                key={nickname}
                className="pretendard-m-12 whitespace-nowrap rounded-[8px] bg-[#F1F4F9] px-[10px] py-[6px] text-sub-gray-1"
              >
                {isMeetingOwner ? `${nickname} · 만남장` : nickname}
              </span>
            ))}
          </div>
          <p className="pretendard-m-12 whitespace-nowrap text-sub-gray-2">
            {participantCount}/{MEETUP_MEMBER_LIMIT}명
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onAction}
        className="pretendard-sb-16 flex h-[56px] items-center justify-center rounded-[12px] border border-main-mint bg-main-mint text-main-white"
      >
        {actionLabel}
      </button>
    </div>
  );
}
