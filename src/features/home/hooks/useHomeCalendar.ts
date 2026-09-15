"use client";

import { addMonths, subMonths } from "date-fns";
import { useMemo, useState } from "react";

import type { CalendarDay, Schedule } from "@/features/home/types";
import { buildCalendarDay, getMonthLabel, getMonthMatrix } from "@/features/home/utils/calendar";

export function useHomeCalendar(
  schedules: Schedule[],
  initialMonth: Date = new Date(),
  initialSelectedDate: Date | null = null
) {
  const [viewMonth, setViewMonth] = useState(
    () => new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialSelectedDate);

  const days = useMemo<CalendarDay[]>(() => {
    const weeks = getMonthMatrix(viewMonth.getFullYear(), viewMonth.getMonth() + 1);
    return weeks.flat().map((date) => buildCalendarDay(date, viewMonth, selectedDate, schedules));
  }, [viewMonth, selectedDate, schedules]);

  const monthLabel = useMemo(() => getMonthLabel(viewMonth), [viewMonth]);

  const goToPrevMonth = () => setViewMonth((prev) => subMonths(prev, 1));
  const goToNextMonth = () => setViewMonth((prev) => addMonths(prev, 1));
  const selectDate = (date: Date) => setSelectedDate(date);

  return {
    viewMonth,
    monthLabel,
    selectedDate,
    days,
    goToPrevMonth,
    goToNextMonth,
    selectDate,
  };
}
