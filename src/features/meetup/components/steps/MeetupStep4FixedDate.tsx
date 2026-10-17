"use client";

import CalendarGrid from "@/components/layout/CalendarGrid";
import CalendarMonthNav from "@/components/layout/CalendarMonthNav";
import CalendarWeekdays from "@/components/layout/CalendarWeekdays";
import Button from "@/components/ui/Button";
import { useDateRangePicker } from "@/hooks/useDateRangePicker";

interface MeetupStep4FixedDateProps {
  /** 박 수. null = 미정이면 기간을 자유롭게 선택, 0 = 무박 */
  nights: number | null;
  isSubmitting: boolean;
  errorMessage?: string;
  onSubmit: (range: { startDate: Date; endDate: Date }) => void;
}

export default function MeetupStep4FixedDate({
  nights,
  isSubmitting,
  errorMessage,
  onSubmit,
}: MeetupStep4FixedDateProps) {
  const { monthLabel, days, rangeStart, rangeEnd, goToPrevMonth, goToNextMonth, selectDate } =
    useDateRangePicker(new Date(), null, null, nights);

  const handleSubmit = () => {
    if (!rangeStart) return;
    onSubmit({ startDate: rangeStart, endDate: rangeEnd ?? rangeStart });
  };

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

      <div className="fixed bottom-0 left-0 right-0 bg-white">
        {errorMessage && (
          <p className="pretendard-m-12 mb-2 text-center text-red-500">
            {errorMessage}
          </p>
        )}
        <Button
          variant="primary"
          disabled={rangeStart === null || isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? "만드는 중..." : "시작하기"}
        </Button>
      </div>
    </div>
  );
}
