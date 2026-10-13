"use client";

import SearchBar from "@/components/ui/SearchBar";
import TabBar from "@/components/ui/TabBar";
import ActiveMeetupList from "@/features/home/components/ActiveMeetupList";
import MeetupItemList from "@/features/home/components/MeetupItemList";
import { useMeetupItemList } from "@/features/home/hooks/useMeetupItemList";
import type { Schedule } from "@/features/home/types";

const TAB_LABELS = ["진행 중인 만남", "종료된 만남"];

interface MeetupSectionProps {
  onSelectSchedule?: (schedule: Schedule) => void;
}

export default function MeetupSection({ onSelectSchedule }: MeetupSectionProps) {
  const {
    activeIndex,
    onTabChange,
    searchQuery,
    onSearchChange,
    hasQuery,
    activeMeetings,
    hasMoreActiveMeetings,
    loadMoreActiveMeetings,
    endedSchedules,
    hasMoreEndedSchedules,
    loadMoreEndedSchedules,
  } = useMeetupItemList();

  return (
    <section className="flex flex-col gap-[21px]">
      <TabBar tabs={TAB_LABELS} activeIndex={activeIndex} onChange={onTabChange} />

      <div className="flex flex-col gap-6 px-4">
        {activeIndex === 0 ? (
          <>
            <SearchBar
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="진행 중인 만남을 검색해 보세요"
            />
            <ActiveMeetupList
              meetings={activeMeetings}
              hasQuery={hasQuery}
              hasMore={hasMoreActiveMeetings}
              onLoadMore={loadMoreActiveMeetings}
            />
          </>
        ) : (
          <MeetupItemList
            schedules={endedSchedules}
            hasMore={hasMoreEndedSchedules}
            onLoadMore={loadMoreEndedSchedules}
            onSelectSchedule={onSelectSchedule}
          />
        )}
      </div>
    </section>
  );
}
