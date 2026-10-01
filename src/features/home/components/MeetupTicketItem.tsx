"use client";


import MeetupMembers from "@/features/home/components/MeetupMembers";
import MeetupStatusBadge from "@/features/home/components/MeetupStatusBadge";
import type { Schedule } from "@/features/home/types";
import { formatDateRange } from "@/features/home/utils/meetup";
import ChevronIcon from "@/components/ui/ChevronIcon";

interface MeetupTicketItemProps {
  schedule: Schedule;
  onClick?: (schedule: Schedule) => void;
}

export default function MeetupTicketItem({ schedule, onClick }: MeetupTicketItemProps) {
  const { title, description, status, leaderName, memberCount } = schedule;

  return (
    <button
      type="button"
      onClick={() => onClick?.(schedule)}
      className="flex w-full flex-col gap-3 rounded-2xl bg-main-white p-4 text-left shadow-[0_0_3px_rgba(0,0,0,0.2)]"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1">
          <p className="pretendard-sb-16 text-main-black">{title}</p>
          <p className="pretendard-m-12 text-sub-gray-2">{formatDateRange(schedule)}</p>
        </div>
        {status !== "done" && <MeetupStatusBadge status={status} />}
      </div>

      <p className="pretendard-r-15 text-main-black">{description}</p>

      <div className="flex items-center justify-between">
        <MeetupMembers leaderName={leaderName} memberCount={memberCount} />
        <ChevronIcon className="text-main-black" />
      </div>
    </button>
  );
}
