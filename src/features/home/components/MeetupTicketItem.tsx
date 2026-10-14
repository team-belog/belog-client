"use client";

import { useRouter } from "next/navigation";

import ChevronIcon from "@/components/ui/ChevronIcon";
import TicketShape from "@/components/ui/TicketShape";
import MeetupMembers from "@/features/home/components/MeetupMembers";
import MeetupStatusBadge from "@/features/home/components/MeetupStatusBadge";
import type { ActiveMeeting } from "@/features/home/types";
import { formatDateRange } from "@/lib/date";

interface MeetupTicketItemProps {
  meeting: ActiveMeeting;
}

export default function MeetupTicketItem({ meeting }: MeetupTicketItemProps) {
  const router = useRouter();
  const { meetingId, name, startDate, endDate, groupName, progressStatus } = meeting;
  const dateLabel =
    startDate && endDate ? formatDateRange({ startDate, endDate }) : "날짜를 조율 중 입니다.";

  return (
    <button
      type="button"
      onClick={() => router.push(`/meetup/${meetingId}`)}
      className="w-full text-left"
    >
      <TicketShape className="w-full">
        <div className="flex flex-col px-8 pb-4 pt-6">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col gap-1">
              <p className="pretendard-sb-18 text-main-black">{name}</p>
              <p className="pretendard-m-15 text-sub-gray-2">{dateLabel}</p>
            </div>
            <MeetupStatusBadge status={progressStatus} />
          </div>

          <p className="pretendard-m-16 mt-5 text-main-black">{groupName}</p>

          <div
            aria-hidden
            className="mt-[14px] h-px w-full bg-[linear-gradient(to_right,#DFE1E5_50%,transparent_50%)] bg-[length:8px_1px]"
          />

          <div className="mt-4 flex items-center justify-between">
            <MeetupMembers
              participants={meeting.previewParticipants}
              participantCount={meeting.participantCount}
            />
            <ChevronIcon className="text-main-black" />
          </div>
        </div>
      </TicketShape>
    </button>
  );
}
