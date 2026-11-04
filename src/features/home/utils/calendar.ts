import { isSameDay, isSameMonth, isToday, isWithinInterval, parseISO } from "date-fns";

import type { HomeCalendarDay, HomeCalendarMeeting } from "@/features/home/types";
import type { RangePosition } from "@/lib/calendar";

export function getMeetingsForDate(date: Date, meetings: HomeCalendarMeeting[]): HomeCalendarMeeting[] {
  return meetings.filter((meeting) =>
    isWithinInterval(date, {
      start: parseISO(meeting.startDate),
      end: parseISO(meeting.endDate),
    })
  );
}

// 전날/다음 날로 이어지는 일정 수
function getConnections(date: Date, meetings: HomeCalendarMeeting[]) {
  return {
    left: meetings.filter((meeting) => !isSameDay(date, parseISO(meeting.startDate))).length,
    right: meetings.filter((meeting) => !isSameDay(date, parseISO(meeting.endDate))).length,
  };
}

// 그날에 걸친 모든 일정을 합쳐서 모양을 정한다 (일정이 겹쳐도 띠가 끊기지 않도록)
export function getRangePosition(date: Date, meetings: HomeCalendarMeeting[]): RangePosition | null {
  if (meetings.length === 0) return null;

  const connections = getConnections(date, meetings);
  const connectsLeft = connections.left > 0;
  const connectsRight = connections.right > 0;
  const isEdge = meetings.some(
    (meeting) => isSameDay(date, parseISO(meeting.startDate)) || isSameDay(date, parseISO(meeting.endDate))
  );

  if (connectsLeft && connectsRight) return isEdge ? "joint" : "middle";
  if (connectsRight) return "start";
  if (connectsLeft) return "end";
  return "single";
}

export function buildCalendarDay(
  date: Date,
  viewMonth: Date,
  selectedDate: Date | null,
  meetings: HomeCalendarMeeting[],
  today?: string
): HomeCalendarDay {
  const dayMeetings = getMeetingsForDate(date, meetings);

  return {
    date,
    isCurrentMonth: isSameMonth(date, viewMonth),
    isToday: today ? isSameDay(date, parseISO(today)) : isToday(date),
    isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
    meetings: dayMeetings,
    rangePosition: getRangePosition(date, dayMeetings),
    overlapCount: Math.max(dayMeetings.length - 1, 0),
  };
}
