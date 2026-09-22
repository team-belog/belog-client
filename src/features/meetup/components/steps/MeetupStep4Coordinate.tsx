"use client";

import Button from "@/components/ui/Button";
import CalendarGrid from "@/features/home/components/CalendarGrid";
import CalendarMonthNav from "@/features/home/components/CalendarMonthNav";
import CalendarWeekdays from "@/features/home/components/CalendarWeekdays";
import { useMeetupCandidateDatesPicker } from "@/features/meetup/hooks/useMeetupCandidateDatesPicker";

interface MeetupStep4CoordinateProps {
  onSubmit: () => void;
}

export default function MeetupStep4Coordinate({
  onSubmit,
}: MeetupStep4CoordinateProps) {
  const { monthLabel, days, selectedDates, goToPrevMonth, goToNextMonth, toggleDate } =
    useMeetupCandidateDatesPicker();

  return (
    <div className="flex flex-col gap-6 px-4 pb-[114px] pt-3">
      <h1 className="pretendard-sb-18 text-main-black">
        후보 날짜를 선택해주세요
      </h1>

      <div className="flex flex-col gap-[22px]">
        <CalendarMonthNav
          label={monthLabel}
          onPrev={goToPrevMonth}
          onNext={goToNextMonth}
        />
        <div className="flex flex-col gap-[15px]">
          <CalendarWeekdays />
          <CalendarGrid days={days} onSelectDate={toggleDate} variant="block" />
        </div>
      </div>

      <Button
        variant="primary"
        disabled={selectedDates.length === 0}
        onClick={onSubmit}
        className="fixed bottom-0 left-0 right-0"
      >
        멤버에게 물어보기
      </Button>
    </div>
  );
}
