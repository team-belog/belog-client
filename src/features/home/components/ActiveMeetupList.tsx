"use client";

import { useEffect, useRef } from "react";

import MeetupEmptyState from "@/features/home/components/MeetupEmptyState";
import MeetupTicketItem from "@/features/home/components/MeetupTicketItem";
import type { ActiveMeeting } from "@/features/home/types";

interface ActiveMeetupListProps {
  // undefined면 아직 불러오는 중
  meetings?: ActiveMeeting[];
  hasQuery: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export default function ActiveMeetupList({
  meetings,
  hasQuery,
  hasMore,
  onLoadMore,
}: ActiveMeetupListProps) {
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

  if (!meetings) return null;
  if (meetings.length === 0) return <MeetupEmptyState hasQuery={hasQuery} />;

  return (
    <div className="flex flex-col gap-[23px]">
      {meetings.map((meeting) => (
        <MeetupTicketItem key={meeting.meetingId} meeting={meeting} />
      ))}
      {hasMore && <div ref={sentinelRef} className="h-px" />}
    </div>
  );
}
