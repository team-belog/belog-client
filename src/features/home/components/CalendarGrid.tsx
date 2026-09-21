"use client";

import CalendarDayCell from "@/features/home/components/CalendarDayCell";
import type { CalendarDay } from "@/features/home/types";
import { toDateKey } from "@/features/home/utils/calendar";

interface CalendarGridProps {
  days: CalendarDay[];
  onSelectDate?: (date: Date) => void;
  variant?: "bubble" | "block";
}

export default function CalendarGrid({ days, onSelectDate, variant = "bubble" }: CalendarGridProps) {
  const gapClass = variant === "block" ? "gap-x-[7px] gap-y-[10px]" : "gap-y-[18px]";

  return (
    <div className={`grid grid-cols-7 ${gapClass}`}>
      {days.map((day) => (
        <CalendarDayCell key={toDateKey(day.date)} day={day} onSelect={onSelectDate} variant={variant} />
      ))}
    </div>
  );
}
