"use client";

import { useState } from "react";
import Image from "next/image";

import MeetupTicketCard from "@/features/home/components/MeetupTicketCard";
import type { Schedule } from "@/features/home/types";

interface MemoryCalendarProps {
  initialYear?: number;
  initialMonth?: number;
  memoryCount?: number;
  daySchedules?: Record<number, Schedule>;
}

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

function getCalendarCells(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function CalendarCell({ day, schedule, onClick }: { day: number; schedule?: Schedule; onClick?: () => void }) {
  return (
    <div
      className="relative aspect-square overflow-hidden rounded-[10px] bg-sub-white border border-[#F7F8F9]"
      onClick={schedule ? onClick : undefined}
    >
      {schedule?.photoUrl && (
        <>
          <Image src={schedule.photoUrl} alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </>
      )}
      <span className={`pretendard-m-15 absolute inset-0 flex items-center justify-center ${schedule?.photoUrl ? "text-white" : "text-main-black"}`}>
        {day}
      </span>
    </div>
  );
}

export default function MemoryCalendar({
  initialYear = 2026,
  initialMonth = 8,
  memoryCount = 0,
  daySchedules = {},
}: MemoryCalendarProps) {
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);

  const handlePrev = () => {
    if (month === 1) { setYear((y) => y - 1); setMonth(12); }
    else setMonth((m) => m - 1);
  };

  const handleNext = () => {
    if (month === 12) { setYear((y) => y + 1); setMonth(1); }
    else setMonth((m) => m + 1);
  };

  const cells = getCalendarCells(year, month);

  return (
    <>
      <div className="flex flex-col items-center gap-[23px] px-[15px] py-4">
        <div className="flex w-full items-center justify-between">
          <button onClick={handlePrev} aria-label="이전 달">
            <Image src="/icons/my/chevron-left.svg" alt="이전" width={28} height={38} />
          </button>
          <p className="pretendard-sb-20 text-main-black">{year}년 {month}월</p>
          <button onClick={handleNext} aria-label="다음 달">
            <Image src="/icons/my/chevron-right.svg" alt="다음" width={28} height={38} />
          </button>
        </div>

        <p className="pretendard-m-15 text-sub-gray-2">{String(memoryCount).padStart(2, "0")}개의 추억</p>

        <div className="grid w-full grid-cols-7 gap-[7px]">
          {DAYS.map((day) => (
            <p key={day} className="pretendard-m-15 text-center text-sub-gray-2">{day}</p>
          ))}
          {cells.map((day, index) =>
            day
              ? <CalendarCell key={index} day={day} schedule={daySchedules[day]} onClick={() => setSelectedSchedule(daySchedules[day])} />
              : <div key={index} className="aspect-square" />
          )}
        </div>
      </div>

      {selectedSchedule && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65"
          onClick={() => setSelectedSchedule(null)}
        >
          <button
            className="absolute right-7 top-[76px]"
            aria-label="닫기"
            onClick={() => setSelectedSchedule(null)}
          >
            <Image src="/icons/my/close.svg" alt="닫기" width={28} height={28} />
          </button>
          <div className="w-[280px]" onClick={(e) => e.stopPropagation()}>
            <MeetupTicketCard schedule={selectedSchedule} />
          </div>
        </div>
      )}
    </>
  );
}
