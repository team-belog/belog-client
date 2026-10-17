"use client";

import { addMonths, format, subMonths } from "date-fns";
import { useMemo, useState } from "react";

import { useGetHomeCalendar } from "@/features/home/hooks/useGetHomeCalendar";
import type { HomeCalendarDay } from "@/features/home/types";
import { buildCalendarDay } from "@/features/home/utils/calendar";
import { getMonthLabel, getMonthMatrix } from "@/lib/calendar";

export function useHomeCalendar(
  initialMonth: Date = new Date(),
  initialSelectedDate: Date | null = null
) {
  const [viewMonth, setViewMonth] = useState(
    () => new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialSelectedDate);

  const yearMonth = format(viewMonth, "yyyy-MM");
  const { data } = useGetHomeCalendar(yearMonth);

  const days = useMemo<HomeCalendarDay[]>(() => {
    const meetings = data?.meetings ?? [];
    const weeks = getMonthMatrix(viewMonth.getFullYear(), viewMonth.getMonth() + 1);
    return weeks.flat().map((date) => buildCalendarDay(date, viewMonth, selectedDate, meetings, data?.today));
  }, [viewMonth, selectedDate, data]);

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
