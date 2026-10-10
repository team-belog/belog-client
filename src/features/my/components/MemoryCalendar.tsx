"use client";

import { useState } from "react";
import Image from "next/image";
import { useGetPostLogCalendar } from "../hooks/useGetPostLogCalendar";
import type { PostLogTicket } from "../types";
import { useGetPostLogTicket } from "@/features/post-log/hooks/useGetPostLogTicket";
import MeetupTicketCard from "@/features/home/components/MeetupTicketCard";
import type { Schedule } from "@/features/home/types";
import ChevronIcon from "@/components/ui/ChevronIcon";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

function getCalendarCells(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function CalendarCell({ day, ticket, onClick }: { day: number; ticket?: PostLogTicket; onClick?: () => void }) {
  return (
    <div
      className="relative aspect-square overflow-hidden rounded-[10px] bg-sub-white border border-[#F7F8F9]"
      onClick={ticket ? onClick : undefined}
    >
      {ticket?.thumbnailUrl && (
        <>
          <Image src={ticket.thumbnailUrl} alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </>
      )}
      <span className={`pretendard-m-15 absolute inset-0 flex items-center justify-center ${ticket?.thumbnailUrl ? "text-white" : "text-main-black"}`}>
        {day}
      </span>
    </div>
  );
}

const today = new Date();

export default function MemoryCalendar() {
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const currentYearMonth = `${year}-${String(month).padStart(2, "0")}`;

  const { data } = useGetPostLogCalendar(currentYearMonth);

  const ticketsByDay: Record<number, PostLogTicket> = {};
  data?.tickets.forEach((ticket) => {
    const day = Number(ticket.meetingEndDate.split("-")[2]);
    ticketsByDay[day] = ticket;
  });

  const cells = getCalendarCells(year, month);
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const { data: ticketDetail } = useGetPostLogTicket(selectedTicketId);

  const ticketSchedule: Schedule | null = ticketDetail
    ? {
        id: ticketDetail.ticketId,
        title: ticketDetail.meetingName,
        description: ticketDetail.memory,
        photoUrl: ticketDetail.coverPhotoUrl ?? undefined,
        startDate: ticketDetail.startDate,
        endDate: ticketDetail.endDate,
        destinationCountry: ticketDetail.location.split(" ")[0],
        destinationCity: ticketDetail.location.split(" ").slice(1).join(" "),
        memberHandles: ticketDetail.members.map((m) => m.nickname),
        status: "done",
        leaderName: "",
        memberCount: ticketDetail.members.length,
      }
    : null;

  const handlePrev = () => {
    if (month === 1) { setYear((y) => y - 1); setMonth(12); }
    else setMonth((m) => m - 1);
  };

  const handleNext = () => {
    if (month === 12) { setYear((y) => y + 1); setMonth(1); }
    else setMonth((m) => m + 1);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-[23px] px-[15px] py-4">
        <div className="flex w-full items-center justify-between">
          <button onClick={handlePrev} aria-label="이전 달">
            <ChevronIcon direction="left" width={28} height={38} className="text-main-black" />
          </button>
          <p className="pretendard-sb-20 text-main-black">{year}년 {month}월</p>
          <button onClick={handleNext} aria-label="다음 달">
            <ChevronIcon width={28} height={38} className="text-main-black" />
          </button>
        </div>

        <p className="pretendard-m-15 text-sub-gray-2">{data?.memoryCount ?? 0}개의 추억</p>

        <div className="grid w-full grid-cols-7 gap-[7px]">
          {DAYS.map((day) => (
            <p key={day} className="pretendard-m-15 text-center text-sub-gray-2">{day}</p>
          ))}
          {cells.map((day, index) =>
            day
              ? <CalendarCell key={index} day={day} ticket={ticketsByDay[day]} onClick={() => setSelectedTicketId(ticketsByDay[day].ticketId)} />
              : <div key={index} className="aspect-square" />
          )}
        </div>
      </div>

      {selectedTicketId && ticketSchedule && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65"
          onClick={() => setSelectedTicketId(null)}
        >
          <button
            className="absolute right-7 top-[76px]"
            aria-label="닫기"
            onClick={() => setSelectedTicketId(null)}
          >
            <Image src="/icons/my/close.svg" alt="닫기" width={28} height={28} />
          </button>
          <div className="w-[280px]" onClick={(e) => e.stopPropagation()}>
            <MeetupTicketCard schedule={ticketSchedule} />
          </div>
        </div>
      )}
    </>
  );
}
