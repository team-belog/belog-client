"use client";

import CalendarDayCell from "@/features/home/components/CalendarDayCell";
import type { CalendarDay } from "@/features/home/types";
import { toDateKey } from "@/features/home/utils/calendar";

interface CalendarGridProps {
  days: CalendarDay[];
  onSelectDate?: (date: Date) => void;
}

export default function CalendarGrid({ days, onSelectDate }: CalendarGridProps) {
  return (
    <div className="grid grid-cols-7 gap-y-[18px]">
      {days.map((day) => (
        <CalendarDayCell key={toDateKey(day.date)} day={day} onSelect={onSelectDate} />
      ))}
    </div>
  );
}
