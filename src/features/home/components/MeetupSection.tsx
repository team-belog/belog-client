"use client";

import SearchBar from "@/components/ui/SearchBar";
import TabBar from "@/components/ui/TabBar";
import MeetupItemList from "@/features/home/components/MeetupItemList";
import { useMeetupItemList } from "@/features/home/hooks/useMeetupItemList";
import type { Schedule } from "@/features/home/types";

const TAB_LABELS = ["진행 중인 만남", "종료된 만남"];

interface MeetupSectionProps {
  schedules: Schedule[];
  onSelectSchedule?: (schedule: Schedule) => void;
}

export default function MeetupSection({
  schedules,
  onSelectSchedule,
}: MeetupSectionProps) {
  const {
    activeIndex,
    onTabChange,
    searchQuery,
    onSearchChange,
    filteredSchedules,
    hasQuery,
  } = useMeetupItemList(schedules);

  return (
    <section className="flex flex-col gap-[21px]">
      <TabBar
        tabs={TAB_LABELS}
        activeIndex={activeIndex}
        onChange={onTabChange}
      />

      <div className="flex flex-col gap-6 px-4">
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          placeholder={`${TAB_LABELS[activeIndex]}을 검색해 보세요`}
        />
        <MeetupItemList
          schedules={filteredSchedules}
          hasQuery={hasQuery}
          variant={activeIndex === 1 ? "memory" : "ticket"}
          onSelectSchedule={onSelectSchedule}
        />
      </div>
    </section>
  );
}
