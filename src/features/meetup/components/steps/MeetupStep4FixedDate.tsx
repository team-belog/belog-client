"use client";

import Button from "@/components/ui/Button";
import CalendarGrid from "@/features/home/components/CalendarGrid";
import CalendarMonthNav from "@/features/home/components/CalendarMonthNav";
import CalendarWeekdays from "@/features/home/components/CalendarWeekdays";
import { useMeetupDateRangePicker } from "@/features/meetup/hooks/useMeetupDateRangePicker";

interface MeetupStep4FixedDateProps {
  onSubmit: () => void;
}

export default function MeetupStep4FixedDate({
  onSubmit,
}: MeetupStep4FixedDateProps) {
  const { monthLabel, days, rangeStart, goToPrevMonth, goToNextMonth, selectDate } =
    useMeetupDateRangePicker();

  return (
    <div className="flex flex-col gap-6 px-4 pb-[114px] pt-3">
      <h1 className="pretendard-sb-18 text-main-black">
        확정된 날짜를 골라주세요
      </h1>

      <div className="flex flex-col gap-[22px]">
        <CalendarMonthNav
          label={monthLabel}
          onPrev={goToPrevMonth}
          onNext={goToNextMonth}
        />
        <div className="flex flex-col gap-[15px]">
          <CalendarWeekdays />
          <CalendarGrid days={days} onSelectDate={selectDate} variant="block" />
        </div>
      </div>

      <Button
        variant="primary"
        disabled={rangeStart === null}
        onClick={onSubmit}
        className="fixed bottom-0 left-0 right-0"
      >
        시작하기
      </Button>
    </div>
  );
}
