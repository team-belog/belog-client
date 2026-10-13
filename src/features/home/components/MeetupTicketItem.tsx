"use client";

import { useRouter } from "next/navigation";

import MeetupMembers from "@/features/home/components/MeetupMembers";
import MeetupStatusBadge from "@/features/home/components/MeetupStatusBadge";
import type { ActiveMeeting } from "@/features/home/types";
import { formatDateRange } from "@/lib/date";
import ChevronIcon from "@/components/ui/ChevronIcon";

interface MeetupTicketItemProps {
  meeting: ActiveMeeting;
}

export default function MeetupTicketItem({ meeting }: MeetupTicketItemProps) {
  const router = useRouter();
  const { meetingId, name, startDate, endDate, groupName, progressStatus } = meeting;
  const dateLabel = startDate && endDate ? formatDateRange({ startDate, endDate }) : "날짜 미정";

  return (
    <button
      type="button"
      onClick={() => router.push(`/meetup/${meetingId}`)}
      className="flex w-full flex-col gap-3 rounded-2xl bg-main-white p-4 text-left shadow-[0_0_3px_rgba(0,0,0,0.2)]"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1">
          <p className="pretendard-sb-16 text-main-black">{name}</p>
          <p className="pretendard-m-12 text-sub-gray-2">{dateLabel}</p>
        </div>
        <MeetupStatusBadge status={progressStatus} />
      </div>

      <p className="pretendard-r-15 text-main-black">{groupName}</p>

      <div className="flex items-center justify-between">
        <MeetupMembers
          participants={meeting.previewParticipants}
          participantCount={meeting.participantCount}
        />
        <ChevronIcon className="text-main-black" />
      </div>
    </button>
  );
}
