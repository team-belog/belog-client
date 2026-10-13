"use client";

import CalendarGrid from "@/components/layout/CalendarGrid";
import CalendarMonthNav from "@/components/layout/CalendarMonthNav";
import CalendarWeekdays from "@/components/layout/CalendarWeekdays";
import Button from "@/components/ui/Button";
import { useMeetupCandidateDatesPicker } from "@/features/meetup/hooks/useMeetupCandidateDatesPicker";

// 후보 일정은 2~10개 (최대 개수는 useMeetupCandidateDatesPicker에서 제한)
const MIN_CANDIDATE_COUNT = 2;

interface MeetupStep4CoordinateProps {
  /** 박 수. null = 미정, 0 = 무박 */
  nights: number | null;
  isSubmitting: boolean;
  errorMessage?: string;
  /** 후보별 시작일 */
  onSubmit: (startDates: Date[]) => void;
}

export default function MeetupStep4Coordinate({
  nights,
  isSubmitting,
  errorMessage,
  onSubmit,
}: MeetupStep4CoordinateProps) {
  const { monthLabel, days, selectedDates, goToPrevMonth, goToNextMonth, toggleDate } =
    useMeetupCandidateDatesPicker(nights);

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

      <div className="fixed bottom-0 left-0 right-0 bg-white">
        {errorMessage && (
          <p className="pretendard-m-12 mb-2 text-center text-red-500">
            {errorMessage}
          </p>
        )}
        <Button
          variant="primary"
          disabled={selectedDates.length < MIN_CANDIDATE_COUNT || isSubmitting}
          onClick={() => onSubmit(selectedDates)}
        >
          {isSubmitting ? "보내는 중..." : "멤버에게 물어보기"}
        </Button>
      </div>
    </div>
  );
}
