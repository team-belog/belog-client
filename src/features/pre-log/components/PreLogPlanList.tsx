"use client";

import { useEffect, useRef } from "react";

import PreLogEmptyState from "@/features/pre-log/components/PreLogEmptyState";
import PreLogPlaceItem from "@/features/pre-log/components/PreLogPlaceItem";
import { usePreLogPlans } from "@/features/pre-log/hooks/usePreLogPlans";
import type { PreLogFilter, PreLogPlan } from "@/features/pre-log/types";

interface PreLogPlanListProps {
  meetingId: number;
  filter: PreLogFilter;
  onSelectPlan?: (plan: PreLogPlan) => void;
  onDeletePlan?: (plan: PreLogPlan) => void;
  emptyMessage?: string;
  emptyClassName?: string;
  className?: string;
}

export default function PreLogPlanList({
  meetingId,
  filter,
  onSelectPlan,
  onDeletePlan,
  emptyMessage,
  emptyClassName,
  className = "flex flex-col",
}: PreLogPlanListProps) {
  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = usePreLogPlans(meetingId, filter);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasNextPage) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isFetchingNextPage) fetchNextPage();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending) {
    return (
      <p className="pretendard-m-15 pt-[25px] text-center text-sub-gray-2">
        불러오는 중...
      </p>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 pt-[25px]">
        <p className="pretendard-m-15 text-sub-gray-2">{error.message}</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="pretendard-m-15 text-main-black underline"
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (data.length === 0) {
    return <PreLogEmptyState message={emptyMessage} className={emptyClassName} />;
  }

  return (
    <div className={className}>
      {data.map((plan) => (
        <PreLogPlaceItem
          key={plan.planId}
          plan={plan}
          onClick={onSelectPlan}
          onDelete={onDeletePlan}
        />
      ))}
      <div ref={sentinelRef} className="h-px shrink-0" />
    </div>
  );
}
