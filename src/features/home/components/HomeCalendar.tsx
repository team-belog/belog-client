"use client";

import CalendarGrid from "@/components/layout/CalendarGrid";
import CalendarMonthNav from "@/components/layout/CalendarMonthNav";
import CalendarWeekdays from "@/components/layout/CalendarWeekdays";
import { useHomeCalendar } from "@/features/home/hooks/useHomeCalendar";

interface HomeCalendarProps {
  initialMonth?: Date;
  initialSelectedDate?: Date | null;
}

export default function HomeCalendar({
  initialMonth,
  initialSelectedDate,
}: HomeCalendarProps) {
  const { monthLabel, days, goToPrevMonth, goToNextMonth, selectDate } =
    useHomeCalendar(initialMonth, initialSelectedDate);

  return (
    <div className="flex flex-col gap-[15px] mx-4 mt-[10px] mb-4">
      <CalendarMonthNav
        label={monthLabel}
        onPrev={goToPrevMonth}
        onNext={goToNextMonth}
      />
      <div className="flex flex-col gap-[19px]">
        <CalendarWeekdays />
        <CalendarGrid days={days} onSelectDate={selectDate} />
      </div>
    </div>
  );
}
