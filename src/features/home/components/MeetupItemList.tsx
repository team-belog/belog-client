"use client";

import { useEffect, useRef } from "react";

import MeetupEmptyState from "@/features/home/components/MeetupEmptyState";
import MeetupTicketCard from "@/features/home/components/MeetupTicketCard";
import type { Schedule } from "@/features/home/types";

interface MeetupListProps {
  // undefined면 아직 불러오는 중
  schedules?: Schedule[];
  hasMore: boolean;
  onLoadMore: () => void;
  onSelectSchedule?: (schedule: Schedule) => void;
}

export default function MeetupList({
  schedules,
  hasMore,
  onLoadMore,
  onSelectSchedule,
}: MeetupListProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) onLoadMore();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, onLoadMore]);

  if (!schedules) return null;
  if (schedules.length === 0) return <MeetupEmptyState hasQuery={false} />;

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        {schedules.map((schedule) => (
          <MeetupTicketCard key={schedule.id} schedule={schedule} onClick={onSelectSchedule} />
        ))}
      </div>
      {hasMore && <div ref={sentinelRef} className="h-px" />}
    </div>
  );
}
