import { format, isSameDay, isSameMonth, parseISO } from "date-fns";

import type { Schedule } from "@/features/home/types";

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

export function filterEndedMeetups(schedules: Schedule[], query: string): Schedule[] {
  const normalizedQuery = query.trim().toLowerCase();

  return schedules.filter(
    (schedule) =>
      schedule.status === "done" &&
      (normalizedQuery === "" || schedule.title.toLowerCase().includes(normalizedQuery))
  );
}
