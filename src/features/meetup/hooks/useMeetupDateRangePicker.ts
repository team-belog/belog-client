"use client";

import { addMonths, isBefore, isSameDay, isWithinInterval, startOfDay, subMonths } from "date-fns";
import { useMemo, useState } from "react";

import type { CalendarDay, RangePosition } from "@/features/home/types";
import { getMonthLabel, getMonthMatrix } from "@/features/home/utils/calendar";

function getRangePosition(date: Date, start: Date, end: Date): RangePosition {
  if (isSameDay(start, end)) return "single";
  if (isSameDay(date, start)) return "start";
  if (isSameDay(date, end)) return "end";
  return "middle";
}

export function useMeetupDateRangePicker(initialMonth: Date = new Date()) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [viewMonth, setViewMonth] = useState(
    () => new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1),
  );
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);

  const days = useMemo<CalendarDay[]>(() => {
    const weeks = getMonthMatrix(viewMonth.getFullYear(), viewMonth.getMonth() + 1);
    return weeks.flat().map((date) => {
      const inRange = rangeStart
        ? isWithinInterval(date, { start: rangeStart, end: rangeEnd ?? rangeStart })
        : false;

      return {
        date,
        isCurrentMonth: date.getMonth() === viewMonth.getMonth(),
        isToday: isSameDay(date, today),
        isSelected: false,
        isPast: isBefore(date, today),
        schedules: [],
        rangePosition:
          inRange && rangeStart ? getRangePosition(date, rangeStart, rangeEnd ?? rangeStart) : null,
      };
    });
  }, [viewMonth, rangeStart, rangeEnd, today]);

  const monthLabel = useMemo(() => getMonthLabel(viewMonth), [viewMonth]);

  const goToPrevMonth = () => setViewMonth((prev) => subMonths(prev, 1));
  const goToNextMonth = () => setViewMonth((prev) => addMonths(prev, 1));

  const selectDate = (date: Date) => {
    if (isBefore(date, today)) return;

    if (!rangeStart || rangeEnd) {
      setRangeStart(date);
      setRangeEnd(null);
      return;
    }

    if (isBefore(date, rangeStart)) {
      setRangeStart(date);
      setRangeEnd(null);
      return;
    }

    setRangeEnd(date);
  };

  return {
    monthLabel,
    days,
    rangeStart,
    rangeEnd,
    goToPrevMonth,
    goToNextMonth,
    selectDate,
  };
}
