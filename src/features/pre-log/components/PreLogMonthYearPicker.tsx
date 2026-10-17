"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import Button from "@/components/ui/Button";

interface PreLogMonthYearPickerProps {
  initialDate: Date;
  onCancel: () => void;
  onConfirm: (date: Date) => void;
}

const ITEM_HEIGHT = 37;
const VISIBLE_COUNT = 5;
const PADDING_COUNT = Math.floor(VISIBLE_COUNT / 2);
const YEAR_RANGE = 50;

const MONTH_OPTIONS = Array.from({ length: 12 }, (_, i) => i + 1);

interface PickerColumnProps {
  value: number;
  options: number[];
  onChange: (value: number) => void;
  formatLabel: (value: number) => string;
}

function PickerColumn({ value, options, onChange, formatLabel }: PickerColumnProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const index = options.indexOf(value);
    if (containerRef.current && index !== -1) {
      containerRef.current.scrollTop = index * ITEM_HEIGHT;
    }
    // 처음 열릴 때 초기값 위치로만 맞추고, 이후 스크롤은 사용자 조작에 맡긴다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const index = Math.round(containerRef.current.scrollTop / ITEM_HEIGHT);
    const clampedIndex = Math.min(Math.max(index, 0), options.length - 1);
    const nextValue = options[clampedIndex];
    if (nextValue !== value) onChange(nextValue);
  };

  const handleSelect = (option: number) => {
    const index = options.indexOf(option);
    containerRef.current?.scrollTo({ top: index * ITEM_HEIGHT, behavior: "smooth" });
  };

  return (
    <div className="relative flex-1">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 z-0 h-[37px] -translate-y-1/2 rounded-[12px] bg-[#E9E9E9]/70"
      />
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="scrollbar-none relative h-[185px] snap-y snap-mandatory overflow-y-scroll"
      >
        <div style={{ height: ITEM_HEIGHT * PADDING_COUNT }} />
        {options.map((option) => {
          const distance = Math.abs(options.indexOf(option) - options.indexOf(value));
          const sizeClass =
            distance === 0
              ? "text-[24px] text-main-black"
              : distance === 1
                ? "text-[20px] text-sub-gray-1"
                : "text-[18px] text-sub-gray-2";

          return (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(option)}
              className={`relative z-10 flex h-[37px] w-full shrink-0 snap-center items-center justify-center font-pretendard font-normal ${sizeClass}`}
            >
              {formatLabel(option)}
            </button>
          );
        })}
        <div style={{ height: ITEM_HEIGHT * PADDING_COUNT }} />
      </div>
    </div>
  );
}

export default function PreLogMonthYearPicker({
  initialDate,
  onCancel,
  onConfirm,
}: PreLogMonthYearPickerProps) {
  const [year, setYear] = useState(initialDate.getFullYear());
  const [month, setMonth] = useState(initialDate.getMonth() + 1);

  const yearOptions = useMemo(() => {
    const base = initialDate.getFullYear();
    return Array.from({ length: YEAR_RANGE * 2 + 1 }, (_, i) => base - YEAR_RANGE + i);
  }, [initialDate]);

  return (
    <div className="flex flex-col">
      <div className="flex px-4 py-5">
        <PickerColumn value={year} options={yearOptions} onChange={setYear} formatLabel={(y) => `${y}년`} />
        <PickerColumn value={month} options={MONTH_OPTIONS} onChange={setMonth} formatLabel={(m) => `${m}월`} />
      </div>

      <div className="flex w-full items-center gap-3 px-4 pb-[28px] pt-[10px]">
        <Button
          variant="tertiary"
          disabled={false}
          bare
          onClick={onCancel}
          className="w-[114px] shrink-0"
        >
          취소
        </Button>
        <Button
          variant="primary"
          disabled={false}
          bare
          onClick={() => onConfirm(new Date(year, month - 1, 1))}
          className="flex-1"
        >
          확인
        </Button>
      </div>
    </div>
  );
}
