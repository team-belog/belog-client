"use client";

import MeetupTicketCard from "@/features/home/components/MeetupTicketCard";
import MeetupTicketItem from "@/features/home/components/MeetupTicketItem";
import type { Schedule } from "@/features/home/types";

interface MeetupListProps {
  schedules: Schedule[];
  hasQuery: boolean;
  variant?: "ticket" | "memory";
  onSelectSchedule?: (schedule: Schedule) => void;
}

export default function MeetupList({
  schedules,
  hasQuery,
  variant = "ticket",
  onSelectSchedule,
}: MeetupListProps) {
  if (schedules.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-[15px] py-[60px]">
        <p className="pretendard-sb-18 text-main-black">
          {hasQuery ? "검색 결과가 없어요" : "아직 등록된 만남이 없어요"}
        </p>
        <p className="pretendard-m-15 text-sub-gray-2">
          {hasQuery
            ? "다른 검색어로 다시 찾아보세요"
            : "새로운 만남을 등록해 보세요"}
        </p>
      </div>
    );
  }

  if (variant === "memory") {
    return (
      <div className="grid grid-cols-2 gap-3">
        {schedules.map((schedule) => (
          <MeetupTicketCard key={schedule.id} schedule={schedule} onClick={onSelectSchedule} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[23px]">
      {schedules.map((schedule) => (
        <MeetupTicketItem
          key={schedule.id}
          schedule={schedule}
          onClick={onSelectSchedule}
        />
      ))}
    </div>
  );
}
