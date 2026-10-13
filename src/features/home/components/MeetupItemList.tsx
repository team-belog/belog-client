"use client";

import MeetupEmptyState from "@/features/home/components/MeetupEmptyState";
import MeetupTicketCard from "@/features/home/components/MeetupTicketCard";
import type { Schedule } from "@/features/home/types";

interface MeetupListProps {
  schedules: Schedule[];
  hasQuery: boolean;
  onSelectSchedule?: (schedule: Schedule) => void;
}

export default function MeetupList({ schedules, hasQuery, onSelectSchedule }: MeetupListProps) {
  if (schedules.length === 0) return <MeetupEmptyState hasQuery={hasQuery} />;

  return (
    <div className="grid grid-cols-2 gap-3">
      {schedules.map((schedule) => (
        <MeetupTicketCard key={schedule.id} schedule={schedule} onClick={onSelectSchedule} />
      ))}
    </div>
  );
}
