"use client";

import {
  addDays,
  addMonths,
  differenceInCalendarDays,
  isBefore,
  isSameDay,
  startOfDay,
  subMonths,
} from "date-fns";
import { useMemo, useState } from "react";

import type { CalendarDay, RangePosition } from "@/features/home/types";
import { getMonthLabel, getMonthMatrix } from "@/features/home/utils/calendar";

/**
 * 후보 하나 = 시작일부터 `nights + 1`일 묶음.
 * 무박 1일(nights = 0)이나 일정 미정(null)이면 날짜 하나가 후보가 된다.
 */
function getRangePosition(
  date: Date,
  starts: Date[],
  lastOffset: number,
): RangePosition | null {
  for (const start of starts) {
    const offset = differenceInCalendarDays(date, start);
    if (offset < 0 || offset > lastOffset) continue;
    if (lastOffset === 0) return "single";
    if (offset === 0) return "start";
    if (offset === lastOffset) return "end";
    return "middle";
  }
  return null;
}

export function useMeetupCandidateDatesPicker(
  nights: number | null,
  initialMonth: Date = new Date(),
) {
  const lastOffset = nights ?? 0;
  const today = useMemo(() => startOfDay(new Date()), []);
  const [viewMonth, setViewMonth] = useState(
    () => new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1),
  );
  const [selectedDates, setSelectedDates] = useState<Date[]>([]); // 후보별 시작일

  const days = useMemo<CalendarDay[]>(() => {
    const weeks = getMonthMatrix(viewMonth.getFullYear(), viewMonth.getMonth() + 1);
    return weeks.flat().map((date) => ({
      date,
      isCurrentMonth: date.getMonth() === viewMonth.getMonth(),
      isToday: isSameDay(date, today),
      isSelected: false,
      isPast: isBefore(date, today),
      schedules: [],
      rangePosition: getRangePosition(date, selectedDates, lastOffset),
    }));
  }, [viewMonth, selectedDates, lastOffset, today]);

  const monthLabel = useMemo(() => getMonthLabel(viewMonth), [viewMonth]);

  const goToPrevMonth = () => setViewMonth((prev) => subMonths(prev, 1));
  const goToNextMonth = () => setViewMonth((prev) => addMonths(prev, 1));

  const toggleDate = (date: Date) => {
    if (isBefore(date, today)) return;

    setSelectedDates((prev) => {
      // 이미 후보에 포함된 날짜를 누르면 그 후보 전체를 해제
      const hit = prev.find((start) => {
        const offset = differenceInCalendarDays(date, start);
        return offset >= 0 && offset <= lastOffset;
      });
      if (hit) return prev.filter((start) => start !== hit);

      // 다른 후보와 겹치는 묶음은 만들 수 없다
      const end = addDays(date, lastOffset);
      const overlaps = prev.some(
        (start) =>
          !isBefore(addDays(start, lastOffset), date) && !isBefore(end, start),
      );
      return overlaps ? prev : [...prev, date];
    });
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
