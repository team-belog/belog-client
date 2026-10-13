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

export function getRangePosition(date: Date, meeting: HomeCalendarMeeting): RangePosition {
  const start = parseISO(meeting.startDate);
  const end = parseISO(meeting.endDate);

  if (isSameDay(start, end)) return "single";
  if (isSameDay(date, start)) return "start";
  if (isSameDay(date, end)) return "end";
  return "middle";
}

export function buildCalendarDay(
  date: Date,
  viewMonth: Date,
  selectedDate: Date | null,
  meetings: HomeCalendarMeeting[],
  today?: string
): HomeCalendarDay {
  const dayMeetings = getMeetingsForDate(date, meetings);
  const [primaryMeeting] = dayMeetings;

  return {
    date,
    isCurrentMonth: isSameMonth(date, viewMonth),
    isToday: today ? isSameDay(date, parseISO(today)) : isToday(date),
    isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
    meetings: dayMeetings,
    rangePosition: primaryMeeting ? getRangePosition(date, primaryMeeting) : null,
  };
}
