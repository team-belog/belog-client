import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  isWithinInterval,
  parseISO,
  startOfMonth,
  startOfWeek,
} from "date-fns";

import type { CalendarDay, RangePosition, Schedule } from "@/features/home/types";

/** month: 1~12 */
export function getMonthMatrix(year: number, month: number): Date[][] {
  const firstOfMonth = new Date(year, month - 1, 1);
  const gridStart = startOfWeek(startOfMonth(firstOfMonth));
  const gridEnd = endOfWeek(endOfMonth(firstOfMonth));

  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

  const weeks: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

export function getMonthLabel(date: Date): string {
  return format(date, "yyyy'년' M'월'");
}

export function toDateKey(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function getSchedulesForDate(date: Date, schedules: Schedule[]): Schedule[] {
  return schedules.filter((schedule) =>
    isWithinInterval(date, {
      start: parseISO(schedule.startDate),
      end: parseISO(schedule.endDate),
    })
  );
}

export function getRangePosition(date: Date, schedule: Schedule): RangePosition {
  const start = parseISO(schedule.startDate);
  const end = parseISO(schedule.endDate);

  if (isSameDay(start, end)) return "single";
  if (isSameDay(date, start)) return "start";
  if (isSameDay(date, end)) return "end";
  return "middle";
}

export function buildCalendarDay(
  date: Date,
  viewMonth: Date,
  selectedDate: Date | null,
  schedules: Schedule[]
): CalendarDay {
  const daySchedules = getSchedulesForDate(date, schedules);
  const [primarySchedule] = daySchedules;

  return {
    date,
    isCurrentMonth: isSameMonth(date, viewMonth),
    isToday: isToday(date),
    isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
    schedules: daySchedules,
    rangePosition: primarySchedule ? getRangePosition(date, primarySchedule) : null,
  };
}
