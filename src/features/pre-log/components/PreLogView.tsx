"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import BackHeader from "@/components/layout/BackHeader";
import Button from "@/components/ui/Button";
import TabBar from "@/components/ui/TabBar";
import MeetupSummary from "@/features/meetup/components/MeetupSummary";
import type { MeetupDetail } from "@/features/meetup/types";
import PreLogCategoryTabs from "@/features/pre-log/components/PreLogCategoryTabs";
import PreLogEmptyState from "@/features/pre-log/components/PreLogEmptyState";
import PreLogPlaceItem from "@/features/pre-log/components/PreLogPlaceItem";
import { PRE_LOG_FILTER_TABS } from "@/features/pre-log/constants/category";
import type { PreLogFilter, PreLogPlace } from "@/features/pre-log/types";

interface PreLogViewProps {
  meetup: MeetupDetail;
  places: PreLogPlace[];
  onAddPlace?: () => void;
  onSelectPlace?: (place: PreLogPlace) => void;
  onDeletePlace?: (place: PreLogPlace) => void;
}

const MAIN_TABS = ["목록", "지도"];

export default function PreLogView({
  meetup,
  places,
  onAddPlace,
  onSelectPlace,
  onDeletePlace,
}: PreLogViewProps) {
  const router = useRouter();
  const [mainTabIndex, setMainTabIndex] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState<PreLogFilter>("stay");

  const handleAddPlace = () => {
    if (onAddPlace) {
      onAddPlace();
    } else {
      router.push("/pre-log/new");
    }
  };

  const filteredPlaces = useMemo(() => {
    if (categoryFilter === "all") return places;
    if (categoryFilter === "pinned") return places.filter((place) => place.isPinned);
    return places.filter((place) => place.category === categoryFilter);
  }, [places, categoryFilter]);

  return (
    <main className="pb-[114px]">
      <BackHeader title="Pre-log" />
      <div className="h-2 w-full bg-[#F1F4F9] opacity-50" />

      <MeetupSummary meetup={meetup} />

      <div className="h-2 w-full bg-[#F1F4F9] opacity-50" />

      <TabBar tabs={MAIN_TABS} activeIndex={mainTabIndex} onChange={setMainTabIndex} />

      {mainTabIndex === 0 ? (
        <>
          <PreLogCategoryTabs
            tabs={PRE_LOG_FILTER_TABS}
            activeKey={categoryFilter}
            onChange={setCategoryFilter}
          />

          {filteredPlaces.length > 0 ? (
            <div className="flex flex-col">
              {filteredPlaces.map((place) => (
                <PreLogPlaceItem
                  key={place.id}
                  place={place}
                  onClick={onSelectPlace}
                  onDelete={onDeletePlace}
                />
              ))}
            </div>
          ) : (
            <PreLogEmptyState />
          )}
        </>
      ) : (
        <div className="flex h-[300px] items-center justify-center">
          <p className="pretendard-m-15 text-sub-gray-2">지도 준비 중이에요</p>
        </div>
      )}

      <Button
        variant="primary"
        disabled={false}
        onClick={handleAddPlace}
        className="fixed bottom-0 left-0 right-0"
      >
        계획 추가
      </Button>
    </main>
  );
}
