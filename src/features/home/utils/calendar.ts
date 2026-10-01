import { isSameDay, isSameMonth, isToday, isWithinInterval, parseISO } from "date-fns";

import type { HomeCalendarDay, Schedule } from "@/features/home/types";
import type { RangePosition } from "@/lib/calendar";

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
): HomeCalendarDay {
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
