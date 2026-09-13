"use client";

import { useMemo, useState } from "react";

import type { Schedule } from "@/features/home/types";
import { filterMeetups, type MeetupTab } from "@/features/home/utils/meetup";

const TABS: MeetupTab[] = ["ongoing", "ended"];

export function useMeetupItemList(schedules: Schedule[]) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const activeTab = TABS[activeIndex];

  const filteredSchedules = useMemo(
    () => filterMeetups(schedules, activeTab, searchQuery),
    [schedules, activeTab, searchQuery]
  );

  return {
    activeIndex,
    onTabChange: setActiveIndex,
    searchQuery,
    onSearchChange: setSearchQuery,
    filteredSchedules,
    hasQuery: searchQuery.trim() !== "",
  };
}
