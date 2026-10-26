import { format, isSameDay, isSameMonth, parseISO } from "date-fns";

import type { CompletedTicket, Schedule } from "@/features/home/types";

export function formatMemoryDateRange(schedule: Schedule): string {
  const start = parseISO(schedule.startDate);
  const end = parseISO(schedule.endDate);

  if (isSameDay(start, end)) {
    return format(start, "yyyy / MM / dd");
  }

  if (isSameMonth(start, end)) {
    return `${format(start, "yyyy / MM / dd")}-${format(end, "dd")}`;
  }

  return `${format(start, "yyyy / MM / dd")} - ${format(end, "yyyy / MM / dd")}`;
}

export function formatMemberLabel(leaderName: string, memberCount: number): string {
  const otherCount = memberCount - 1;
  return otherCount > 0 ? `${leaderName} 외 ${otherCount}명` : leaderName;
}

// 종료된 만남 티켓을 티켓 카드(MeetupTicketCard)가 쓰는 Schedule 형태로 변환한다
export function toTicketSchedule(ticket: CompletedTicket): Schedule {
  return {
    id: ticket.ticketId,
    meetingId: ticket.meetingId,
    title: ticket.meetingName,
    description: ticket.memory,
    photoUrl: ticket.coverPhotoUrl ?? undefined,
    startDate: ticket.startDate,
    endDate: ticket.endDate,
    destinationCity: ticket.location,
    memberHandles: ticket.participants.map((participant) => participant.nickname),
    status: "done",
    leaderName: ticket.participants[0]?.nickname ?? "",
    memberCount: ticket.participants.length,
  };
}
