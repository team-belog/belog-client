"use client";

import ChevronIcon from "@/components/ui/ChevronIcon";

interface CalendarMonthNavProps {
  label: string;
  onPrev: () => void;
  onNext: () => void;
}

export default function CalendarMonthNav({
  label,
  onPrev,
  onNext,
}: CalendarMonthNavProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <button
        type="button"
        onClick={onPrev}
        aria-label="이전 달"
        className="flex h-[38px] w-[28px] items-center justify-center"
      >
        <ChevronIcon direction="left" className="text-main-black" />
      </button>

      <p className="pretendard-sb-20 flex-1 whitespace-nowrap text-center text-main-black">
        {label}
      </p>

      <button
        type="button"
        onClick={onNext}
        aria-label="다음 달"
        className="flex h-[38px] w-[28px] items-center justify-center"
      >
        <ChevronIcon className="text-main-black" />
      </button>
    </div>
  );
}
