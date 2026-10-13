"use client";

import { useCallback, useMemo, useState } from "react";

import { useGetActiveMeetings } from "@/features/home/hooks/useGetActiveMeetings";
import type { Schedule } from "@/features/home/types";
import { filterEndedMeetups } from "@/features/home/utils/meetup";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

export function useMeetupItemList(endedSchedules: Schedule[]) {
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

  const filteredEndedSchedules = useMemo(
    () => filterEndedMeetups(endedSchedules, searchQuery),
    [endedSchedules, searchQuery]
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
    filteredEndedSchedules,
  };
}
