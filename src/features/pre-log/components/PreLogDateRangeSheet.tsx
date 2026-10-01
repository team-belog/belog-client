"use client";

import { useState } from "react";

import CalendarGrid from "@/components/layout/CalendarGrid";
import CalendarWeekdays from "@/components/layout/CalendarWeekdays";
import Button from "@/components/ui/Button";
import PreLogMonthYearPicker from "@/features/pre-log/components/PreLogMonthYearPicker";
import { useDateRangePicker } from "@/hooks/useDateRangePicker";
import ChevronIcon from "@/components/ui/ChevronIcon";

interface PreLogDateRangeSheetProps {
  startDate: Date;
  endDate: Date;
  onCancel: () => void;
  onConfirm: (range: { startDate: Date; endDate: Date }) => void;
}

export default function PreLogDateRangeSheet({
  startDate,
  endDate,
  onCancel,
  onConfirm,
}: PreLogDateRangeSheetProps) {
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);
  const { viewMonth, monthLabel, days, rangeStart, rangeEnd, goToPrevMonth, goToNextMonth, goToMonth, selectDate } =
    useDateRangePicker(startDate, startDate, endDate);

  const handleConfirm = () => {
    if (!rangeStart) return;
    onConfirm({ startDate: rangeStart, endDate: rangeEnd ?? rangeStart });
  };

  return (
    <div className="fixed inset-0 z-50">
      <button type="button" aria-label="닫기" onClick={onCancel} className="absolute inset-0" />

      <div className="absolute inset-x-0 bottom-0 overflow-hidden rounded-t-[38px] bg-white shadow-[0px_-4px_5px_0px_rgba(0,0,0,0.03)]">
        <div className="mx-auto my-[10px] h-[5px] w-[70px] rounded-[8px] bg-sub-gray-3" />

        {isMonthPickerOpen ? (
          <PreLogMonthYearPicker
            initialDate={viewMonth}
            onCancel={() => setIsMonthPickerOpen(false)}
            onConfirm={(date) => {
              goToMonth(date);
              setIsMonthPickerOpen(false);
            }}
          />
        ) : (
          <>
            <div className="flex flex-col gap-[15px] px-4 pb-[28px] pt-[8px]">
              <div className="flex w-full items-center justify-between">
                <button
                  type="button"
                  onClick={goToPrevMonth}
                  aria-label="이전 달"
                  className="flex h-[38px] w-[28px] items-center justify-center"
                >
                  <ChevronIcon direction="left" className="text-main-black" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsMonthPickerOpen(true)}
                  className="pretendard-sb-20 flex-1 text-center text-main-black"
                >
                  {monthLabel}
                </button>

                <button
                  type="button"
                  onClick={goToNextMonth}
                  aria-label="다음 달"
                  className="flex h-[38px] w-[28px] items-center justify-center"
                >
                  <ChevronIcon className="text-main-black" />
                </button>
              </div>

              <div className="flex flex-col gap-[15px]">
                <CalendarWeekdays />
                <CalendarGrid days={days} onSelectDate={selectDate} variant="block" />
              </div>
            </div>

            <div className="flex w-full items-center gap-3 px-4 pb-[28px]">
              <Button
                variant="tertiary"
                disabled={false}
                bare
                onClick={onCancel}
                className="w-[114px] shrink-0"
              >
                취소
              </Button>
              <Button variant="primary" disabled={!rangeStart} bare onClick={handleConfirm} className="flex-1">
                확인
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
