import { format, isSameDay, isSameMonth, parseISO } from "date-fns";

import type { Schedule } from "@/features/home/types";

export type MeetupTab = "ongoing" | "ended";

export function formatDateRange(schedule: Schedule): string {
  const start = format(parseISO(schedule.startDate), "yyyy.MM.dd");
  const end = format(parseISO(schedule.endDate), "yyyy.MM.dd");
  return `${start} - ${end}`;
}

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

export function formatMemberLabel(schedule: Pick<Schedule, "leaderName" | "memberCount">): string {
  const { leaderName, memberCount } = schedule;
  return memberCount > 0 ? `${leaderName} 외 ${memberCount}명` : leaderName;
}

export function filterMeetups(schedules: Schedule[], tab: MeetupTab, query: string): Schedule[] {
  const normalizedQuery = query.trim().toLowerCase();

  return schedules.filter((schedule) => {
    const matchesTab = tab === "ongoing" ? schedule.status !== "done" : schedule.status === "done";
    const matchesQuery =
      normalizedQuery === "" || schedule.title.toLowerCase().includes(normalizedQuery);
    return matchesTab && matchesQuery;
  });
}
