"use client";

import Profile from "@/components/ui/Profile";
import type { MeetingMemberDto } from "@/features/meetup/types";

interface MeetupCurrentMemberRowProps {
  member: MeetingMemberDto;
  // 넘기지 않으면 삭제 버튼을 숨김 (isRemovable이 false인 멤버)
  onRemove?: () => void;
}

export default function MeetupCurrentMemberRow({
  member,
  onRemove,
}: MeetupCurrentMemberRowProps) {
  return (
    <div className="flex w-full items-center justify-between py-[10px]">
      <div className="flex items-center gap-[10px]">
        <Profile src={member.profileImageUrl ?? undefined} width={55} height={55} />
        <span className="pretendard-m-15 text-main-black">{member.nickname}</span>
      </div>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="pretendard-r-15 text-sub-gray-2"
        >
          멤버 삭제
        </button>
      )}
    </div>
  );
}
