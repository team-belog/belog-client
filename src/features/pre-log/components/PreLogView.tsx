"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import BackHeader from "@/components/layout/BackHeader";
import Button from "@/components/ui/Button";
import TabBar from "@/components/ui/TabBar";
import MeetupSummary from "@/features/meetup/components/MeetupSummary";
import type { MeetupDetail } from "@/features/meetup/types";
import PreLogCategoryTabs from "@/features/pre-log/components/PreLogCategoryTabs";
import PreLogDateRangeSheet from "@/features/pre-log/components/PreLogDateRangeSheet";
import PreLogDeleteModal from "@/features/pre-log/components/PreLogDeleteModal";
import PreLogEmptyState from "@/features/pre-log/components/PreLogEmptyState";
import PreLogMapView from "@/features/pre-log/components/PreLogMapView";
import PreLogPlaceItem from "@/features/pre-log/components/PreLogPlaceItem";
import { PRE_LOG_FILTER_TABS } from "@/features/pre-log/constants/category";
import type { PreLogFilter, PreLogPlace } from "@/features/pre-log/types";
import { formatDotDate, parseDotDate } from "@/features/pre-log/utils/dateRange";

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
  const [title, setTitle] = useState(meetup.title);
  const [location, setLocation] = useState(meetup.location);
  const [dates, setDates] = useState({ startDate: meetup.startDate, endDate: meetup.endDate });
  const [isEditingSummary, setIsEditingSummary] = useState(false);
  const [isEditDatesOpen, setIsEditDatesOpen] = useState(false);
  const [placeList, setPlaceList] = useState(places);
  const [deleteTarget, setDeleteTarget] = useState<PreLogPlace | null>(null);

  const handleAddPlace = () => {
    if (onAddPlace) {
      onAddPlace();
    } else {
      router.push("/pre-log/new");
    }
  };

  const handleConfirmDates = (range: { startDate: Date; endDate: Date }) => {
    setDates({
      startDate: formatDotDate(range.startDate),
      endDate: formatDotDate(range.endDate),
    });
    setIsEditDatesOpen(false);
  };

  const filteredPlaces = useMemo(() => {
    if (categoryFilter === "all") return placeList;
    if (categoryFilter === "pinned") return placeList.filter((place) => place.isPinned);
    return placeList.filter((place) => place.category === categoryFilter);
  }, [placeList, categoryFilter]);

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    setPlaceList((prev) => prev.filter((place) => place.id !== deleteTarget.id));
    onDeletePlace?.(deleteTarget);
    setDeleteTarget(null);
  };

  return (
    <main className="flex min-h-dvh flex-col pb-[114px]">
      <BackHeader title="Pre-log" />
      <div className="h-2 w-full bg-[#F1F4F9] opacity-50" />

      {mainTabIndex === 0 && (
        <>
          <MeetupSummary
            meetup={{ ...meetup, title, location, startDate: dates.startDate, endDate: dates.endDate }}
            isEditing={isEditingSummary}
            onEdit={() => setIsEditingSummary((prev) => !prev)}
            onTitleChange={setTitle}
            onLocationChange={setLocation}
            onDateClick={() => setIsEditDatesOpen(true)}
          />

          <div className="h-2 w-full bg-[#F1F4F9] opacity-50" />
        </>
      )}

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
                  onDelete={setDeleteTarget}
                />
              ))}
            </div>
          ) : (
            <PreLogEmptyState />
          )}
        </>
      ) : (
        <PreLogMapView
          places={placeList}
          onSelectPlace={onSelectPlace}
          onDeletePlace={setDeleteTarget}
        />
      )}

      <Button
        variant="primary"
        disabled={false}
        onClick={handleAddPlace}
        className="fixed bottom-0 left-0 right-0"
      >
        계획 추가
      </Button>

      {isEditDatesOpen && (
        <PreLogDateRangeSheet
          startDate={parseDotDate(dates.startDate)}
          endDate={parseDotDate(dates.endDate)}
          onCancel={() => setIsEditDatesOpen(false)}
          onConfirm={handleConfirmDates}
        />
      )}

      {deleteTarget && (
        <PreLogDeleteModal
          placeName={deleteTarget.title}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </main>
  );
}
