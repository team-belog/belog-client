"use client";

import { addMonths, isBefore, isSameDay, startOfDay, subMonths } from "date-fns";
import { useMemo, useState } from "react";

import type { CalendarDay } from "@/features/home/types";
import { getMonthLabel, getMonthMatrix } from "@/features/home/utils/calendar";

export function useMeetupCandidateDatesPicker(initialMonth: Date = new Date()) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [viewMonth, setViewMonth] = useState(
    () => new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1),
  );
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const days = useMemo<CalendarDay[]>(() => {
    const weeks = getMonthMatrix(viewMonth.getFullYear(), viewMonth.getMonth() + 1);
    return weeks.flat().map((date) => ({
      date,
      isCurrentMonth: date.getMonth() === viewMonth.getMonth(),
      isToday: isSameDay(date, today),
      isSelected: false,
      isPast: isBefore(date, today),
      schedules: [],
      rangePosition: selectedDates.some((selected) => isSameDay(selected, date))
        ? "single"
        : null,
    }));
  }, [viewMonth, selectedDates, today]);

  const monthLabel = useMemo(() => getMonthLabel(viewMonth), [viewMonth]);

  const goToPrevMonth = () => setViewMonth((prev) => subMonths(prev, 1));
  const goToNextMonth = () => setViewMonth((prev) => addMonths(prev, 1));

  const toggleDate = (date: Date) => {
    if (isBefore(date, today)) return;

    setSelectedDates((prev) =>
      prev.some((selected) => isSameDay(selected, date))
        ? prev.filter((selected) => !isSameDay(selected, date))
        : [...prev, date],
    );
  };

  return {
    monthLabel,
    days,
    selectedDates,
    goToPrevMonth,
    goToNextMonth,
    toggleDate,
  };
}
