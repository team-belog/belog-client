"use client";

import type { CalendarDay } from "@/features/home/types";

interface CalendarDayCellProps {
  day: CalendarDay;
  onSelect?: (date: Date) => void;
  variant?: "bubble" | "block";
}

function BubbleDayCell({ day, onSelect }: Pick<CalendarDayCellProps, "day" | "onSelect">) {
  const hasCircle =
    day.isSelected ||
    day.rangePosition === "single" ||
    day.rangePosition === "start" ||
    day.rangePosition === "end";

  const hasBar = day.rangePosition === "middle" || day.rangePosition === "start" || day.rangePosition === "end";

  const barPositionClass =
    day.rangePosition === "start"
      ? "left-1/2 right-0"
      : day.rangePosition === "end"
        ? "left-0 right-1/2"
        : "left-0 right-0";

  const circleColorClass = day.isSelected ? "bg-main-mint" : "bg-main-black";

  const textColorClass = hasCircle
    ? "pretendard-sb-15 text-main-white"
    : day.isCurrentMonth
      ? "pretendard-m-15 text-main-black"
      : "pretendard-m-15 text-sub-gray-3";

  return (
    <button
      type="button"
      onClick={() => onSelect?.(day.date)}
      disabled={!day.isCurrentMonth}
      className="relative flex h-[34px] w-full items-center justify-center disabled:cursor-default"
    >
      {hasBar && (
        <span aria-hidden className={`absolute inset-y-0 bg-main-black/25 ${barPositionClass}`} />
      )}

      {hasCircle && (
        <span
          aria-hidden
          className={`absolute left-1/2 top-1/2 size-[34px] -translate-x-1/2 -translate-y-1/2 rounded-full ${circleColorClass}`}
        />
      )}

      <p className={`relative z-10 ${textColorClass}`}>{day.date.getDate()}</p>
    </button>
  );
}

function BlockDayCell({ day, onSelect }: Pick<CalendarDayCellProps, "day" | "onSelect">) {
  const isRangeSelected = day.rangePosition !== null;
  const disabled = !day.isCurrentMonth || Boolean(day.isPast);

  const cellClass = isRangeSelected
    ? "bg-main-mint"
    : disabled && day.isCurrentMonth
      ? "bg-[#DFE1E5]"
      : "border border-[#F7F8F9] bg-[#FBFCFE]";

  const textClass = isRangeSelected
    ? "pretendard-m-15 text-white"
    : day.isCurrentMonth
      ? "pretendard-m-15 text-main-black"
      : "pretendard-m-15 text-sub-gray-1";

  return (
    <button
      type="button"
      onClick={() => onSelect?.(day.date)}
      disabled={disabled}
      className={`flex h-[45px] w-full items-center justify-center rounded-[10px] disabled:cursor-default ${cellClass}`}
    >
      <span className={textClass}>{day.date.getDate()}</span>
    </button>
  );
}

export default function CalendarDayCell({ day, onSelect, variant = "bubble" }: CalendarDayCellProps) {
  return variant === "block" ? (
    <BlockDayCell day={day} onSelect={onSelect} />
  ) : (
    <BubbleDayCell day={day} onSelect={onSelect} />
  );
}
