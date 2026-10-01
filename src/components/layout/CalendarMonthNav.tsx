"use client";

import Image from "next/image";

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
        <Image src="/icons/home/prev-arrow.svg" alt="" width={10} height={20} />
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
        <Image src="/icons/home/next-arrow.svg" alt="" width={10} height={20} />
      </button>
    </div>
  );
}
