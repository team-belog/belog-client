"use client";

import type { CalendarDay } from "@/lib/calendar";

interface CalendarDayCellProps {
  day: CalendarDay;
  onSelect?: (date: Date) => void;
  variant?: "bubble" | "block";
}

function BubbleDayCell({ day, onSelect }: Pick<CalendarDayCellProps, "day" | "onSelect">) {
  const hasCircle =
    day.rangePosition === "single" ||
    day.rangePosition === "start" ||
    day.rangePosition === "end" ||
    day.rangePosition === "joint";

  // 띠를 왼쪽/오른쪽 절반으로 나눠 그린다
  const hasLeftBar = day.rangePosition === "end" || day.rangePosition === "middle" || day.rangePosition === "joint";
  const hasRightBar = day.rangePosition === "start" || day.rangePosition === "middle" || day.rangePosition === "joint";
  const overlapCount = day.overlapCount ?? 0;

  // 오늘은 일정 여부와 관계없이 흰 바탕 + 민트 테두리 원으로 표시한다
  const textColorClass = day.isToday
    ? "pretendard-sb-15 text-main-mint"
    : hasCircle
      ? "pretendard-m-15 text-main-white"
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
      {hasLeftBar && (
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 right-1/2 bg-main-mint/40"
        />
      )}
      {hasRightBar && (
        <span
          aria-hidden
          className="absolute inset-y-0 left-1/2 right-0 bg-main-mint/40"
        />
      )}

      {/* 일정이 겹치는 날은 날짜 위에 점 + 겹친 일정 수(+N)를 표시한다 (점이 날짜 중앙에 오도록 정렬) */}
      {overlapCount > 0 && (
        <span
          aria-label={`일정 ${overlapCount}개 겹침`}
          className="absolute bottom-[calc(100%+6px)] left-1/2 flex h-[10px] -translate-x-[3px] items-center gap-[2px]"
        >
          <span aria-hidden className="size-[6px] rounded-full bg-main-mint" />
          <span className="pretendard-sb-8 text-main-mint">+{overlapCount}</span>
        </span>
      )}

      {day.isToday ? (
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 size-[36px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-main-mint bg-main-white"
        />
      ) : (
        hasCircle && (
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 size-[34px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-main-mint"
          />
        )
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
    : disabled
      ? "bg-[#DFE1E5]"
      : "border border-[#F7F8F9] bg-[#FBFCFE]";

  const textClass = isRangeSelected
    ? "pretendard-m-15 text-white"
    : "pretendard-m-15 text-main-black";

  // 여러 날 묶음은 셀 뒤에 연한 민트 띠를 깔아 한 덩어리로 보이게 한다 (셀 사이 gap 7px 포함)
  const bandClass =
    day.rangePosition === "start"
      ? "left-0 -right-[3.5px] rounded-l-[10px]"
      : day.rangePosition === "end"
        ? "-left-[3.5px] right-0 rounded-r-[10px]"
        : day.rangePosition === "middle"
          ? "-left-[3.5px] -right-[3.5px]"
          : null;

  return (
    <div className="relative">
      {bandClass && (
        <span aria-hidden className={`absolute inset-y-0 bg-main-mint/30 ${bandClass}`} />
      )}
      <button
        type="button"
        onClick={() => onSelect?.(day.date)}
        disabled={disabled}
        className={`relative flex h-[45px] w-full items-center justify-center rounded-[10px] disabled:cursor-default ${cellClass}`}
      >
        <span className={textClass}>{day.date.getDate()}</span>
      </button>
    </div>
  );
}

export default function CalendarDayCell({ day, onSelect, variant = "bubble" }: CalendarDayCellProps) {
  return variant === "block" ? (
    <BlockDayCell day={day} onSelect={onSelect} />
  ) : (
    <BubbleDayCell day={day} onSelect={onSelect} />
  );
}
