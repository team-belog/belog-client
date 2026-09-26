"use client";

import CalendarGrid from "@/components/layout/CalendarGrid";
import CalendarMonthNav from "@/components/layout/CalendarMonthNav";
import CalendarWeekdays from "@/components/layout/CalendarWeekdays";
import { useHomeCalendar } from "@/features/home/hooks/useHomeCalendar";
import type { Schedule } from "@/features/home/types";

interface HomeCalendarProps {
  schedules: Schedule[];
  initialMonth?: Date;
  initialSelectedDate?: Date | null;
}

export default function HomeCalendar({
  schedules,
  initialMonth,
  initialSelectedDate,
}: HomeCalendarProps) {
  const { monthLabel, days, goToPrevMonth, goToNextMonth, selectDate } = useHomeCalendar(
    schedules,
    initialMonth,
    initialSelectedDate
  );

  return (
    <div className="flex flex-col gap-[15px] px-4 pt-[10px]">
      <CalendarMonthNav label={monthLabel} onPrev={goToPrevMonth} onNext={goToNextMonth} />
      <div className="flex flex-col gap-[19px]">
        <CalendarWeekdays />
        <CalendarGrid days={days} onSelectDate={selectDate} />
      </div>
    </div>
  );
}
