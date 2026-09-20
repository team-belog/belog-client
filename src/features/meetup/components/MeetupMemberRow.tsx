"use client";

import Image from "next/image";

import Profile from "@/components/ui/Profile";
import type { GroupMember } from "@/features/group/types";

interface MeetupMemberRowProps {
  member: GroupMember;
  selected: boolean;
  onToggle: () => void;
}

export default function MeetupMemberRow({
  member,
  selected,
  onToggle,
}: MeetupMemberRowProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between py-[10px]"
    >
      <div className="flex items-center gap-[10px]">
        <Profile src={member.avatarUrl} width={55} height={55} />
        <span className="pretendard-m-15 text-main-black">{member.name}</span>
      </div>
      <Image
        src={
          selected
            ? "/icons/meetup/member-check-on.svg"
            : "/icons/meetup/member-check-off.svg"
        }
        alt={selected ? "선택됨" : "선택 안 됨"}
        width={25}
        height={25}
      />
    </button>
  );
}
