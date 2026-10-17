"use client";

import { useCallback, useMemo, useState } from "react";

import { useGetActiveMeetings } from "@/features/home/hooks/useGetActiveMeetings";
import { useGetCompletedTickets } from "@/features/home/hooks/useGetCompletedTickets";
import { toTicketSchedule } from "@/features/home/utils/meetup";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

export function useMeetupItemList() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebouncedValue(searchQuery.trim());

  const {
    data: activeMeetings,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetActiveMeetings(debouncedQuery);

  const loadMoreActiveMeetings = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const {
    data: completedTickets,
    hasNextPage: hasNextCompletedPage,
    isFetchingNextPage: isFetchingNextCompletedPage,
    fetchNextPage: fetchNextCompletedPage,
  } = useGetCompletedTickets(activeIndex === 1);

  const loadMoreEndedSchedules = useCallback(() => {
    if (hasNextCompletedPage && !isFetchingNextCompletedPage) fetchNextCompletedPage();
  }, [hasNextCompletedPage, isFetchingNextCompletedPage, fetchNextCompletedPage]);

  const endedSchedules = useMemo(
    () => completedTickets?.map(toTicketSchedule),
    [completedTickets]
  );

  return {
    activeIndex,
    onTabChange: setActiveIndex,
    searchQuery,
    onSearchChange: setSearchQuery,
    hasQuery: searchQuery.trim() !== "",
    activeMeetings,
    hasMoreActiveMeetings: Boolean(hasNextPage),
    loadMoreActiveMeetings,
    endedSchedules,
    hasMoreEndedSchedules: Boolean(hasNextCompletedPage),
    loadMoreEndedSchedules,
  };
}
