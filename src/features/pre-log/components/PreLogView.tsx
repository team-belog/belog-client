"use client";

import { differenceInCalendarDays, format, parseISO } from "date-fns";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import BackHeader from "@/components/layout/BackHeader";
import Button from "@/components/ui/Button";
import TabBar from "@/components/ui/TabBar";
import MeetupSummary from "@/features/meetup/components/MeetupSummary";
import type { UpdateMeetingRequest } from "@/features/meetup/types";
import PreLogCategoryTabs from "@/features/pre-log/components/PreLogCategoryTabs";
import PreLogDateRangeSheet from "@/features/pre-log/components/PreLogDateRangeSheet";
import PreLogDeleteModal from "@/features/pre-log/components/PreLogDeleteModal";
import PreLogEmptyState from "@/features/pre-log/components/PreLogEmptyState";
import PreLogMapView from "@/features/pre-log/components/PreLogMapView";
import PreLogPlaceItem from "@/features/pre-log/components/PreLogPlaceItem";
import { PRE_LOG_FILTER_TABS } from "@/features/pre-log/constants/category";
import type {
  PreLogFilter,
  PreLogMainData,
  PreLogPlace,
} from "@/features/pre-log/types";
import { formatDateRange } from "@/lib/date";

const API_DATE_FORMAT = "yyyy-MM-dd";

interface PreLogViewProps {
  meeting: PreLogMainData;
  places: PreLogPlace[];
  isUpdating: boolean;
  updateErrorMessage?: string;
  onUpdate: (
    body: UpdateMeetingRequest,
    options?: { onSuccess?: () => void },
  ) => void;
  onAddPlace?: () => void;
  onSelectPlace?: (place: PreLogPlace) => void;
  onDeletePlace?: (place: PreLogPlace) => void;
}

const MAIN_TABS = ["목록", "지도"];

function toDraft(meeting: PreLogMainData): UpdateMeetingRequest {
  return {
    name: meeting.meetingName,
    location: meeting.location,
    startDate: meeting.startDate,
    endDate: meeting.endDate,
  };
}

export default function PreLogView({
  meeting,
  places,
  isUpdating,
  updateErrorMessage,
  onUpdate,
  onAddPlace,
  onSelectPlace,
  onDeletePlace,
}: PreLogViewProps) {
  const router = useRouter();
  const [mainTabIndex, setMainTabIndex] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState<PreLogFilter>("stay");
  const [isEditingSummary, setIsEditingSummary] = useState(false);
  const [isEditDatesOpen, setIsEditDatesOpen] = useState(false);
  const [draft, setDraft] = useState(() => toDraft(meeting));
  const [placeList, setPlaceList] = useState(places);
  const [deleteTarget, setDeleteTarget] = useState<PreLogPlace | null>(null);

  const { name, location, startDate, endDate } = isEditingSummary
    ? draft
    : toDraft(meeting);

  // 일정 조율 중인 만남은 일정이 없고, 종료된 만남은 일정을 바꿀 수 없음
  const canEditDates = meeting.meetingStatus === "CONFIRMED" && !meeting.isEnded;

  const summary = {
    title: name,
    groupName: meeting.groupName,
    dDay: startDate
      ? differenceInCalendarDays(parseISO(startDate), new Date())
      : null,
    // formatDateRange가 기간을 한 문자열로 만들어 주므로 endDate는 비워 둠
    startDate:
      startDate && endDate
        ? formatDateRange({ startDate, endDate })
        : "일정 조율 중",
    endDate: "",
    location: location ?? "",
  };

  const handleAddPlace = () => {
    if (onAddPlace) {
      onAddPlace();
    } else {
      router.push(`/pre-log/new?meetingId=${meeting.meetingId}`);
    }
  };

  const handleEditSummary = () => {
    if (isUpdating) return;

    if (!isEditingSummary) {
      setDraft(toDraft(meeting));
      setIsEditingSummary(true);
      return;
    }

    const trimmedName = draft.name.trim();
    if (!trimmedName) return;

    onUpdate(
      {
        ...draft,
        name: trimmedName,
        location: draft.location?.trim() || null,
      },
      { onSuccess: () => setIsEditingSummary(false) },
    );
  };

  const handleConfirmDates = (range: { startDate: Date; endDate: Date }) => {
    setDraft((prev) => ({
      ...prev,
      startDate: format(range.startDate, API_DATE_FORMAT),
      endDate: format(range.endDate, API_DATE_FORMAT),
    }));
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
            meetup={summary}
            canEdit={meeting.canEditMeeting}
            isEditing={isEditingSummary}
            onEdit={handleEditSummary}
            onTitleChange={(value) => setDraft((prev) => ({ ...prev, name: value }))}
            onLocationChange={(value) =>
              setDraft((prev) => ({ ...prev, location: value }))
            }
            onDateClick={canEditDates ? () => setIsEditDatesOpen(true) : undefined}
          />

          {isEditingSummary && updateErrorMessage && (
            <p className="pretendard-m-12 px-4 pb-2 text-red-500">
              {updateErrorMessage}
            </p>
          )}

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

      {isEditDatesOpen && draft.startDate && draft.endDate && (
        <PreLogDateRangeSheet
          startDate={parseISO(draft.startDate)}
          endDate={parseISO(draft.endDate)}
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
