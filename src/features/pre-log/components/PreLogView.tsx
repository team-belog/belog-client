"use client";

import { differenceInCalendarDays, format, parseISO } from "date-fns";
import { useState } from "react";
import { useRouter } from "next/navigation";

import BackHeader from "@/components/layout/BackHeader";
import Button from "@/components/ui/Button";
import TabBar from "@/components/ui/TabBar";
import MeetupSummary from "@/features/meetup/components/MeetupSummary";
import type { UpdateMeetingRequest } from "@/features/meetup/types";
import PreLogCategoryTabs from "@/features/pre-log/components/PreLogCategoryTabs";
import PreLogDateRangeSheet from "@/features/pre-log/components/PreLogDateRangeSheet";
import PreLogDeleteModal from "@/features/pre-log/components/PreLogDeleteModal";
import PreLogMapView from "@/features/pre-log/components/PreLogMapView";
import PreLogPlanList from "@/features/pre-log/components/PreLogPlanList";
import { PRE_LOG_FILTER_TABS } from "@/features/pre-log/constants/category";
import type {
  PreLogFilter,
  PreLogMainData,
  PreLogPlan,
} from "@/features/pre-log/types";
import { formatDateRange } from "@/lib/date";

const API_DATE_FORMAT = "yyyy-MM-dd";

interface PreLogViewProps {
  meeting: PreLogMainData;
  isUpdating: boolean;
  updateErrorMessage?: string;
  onUpdate: (
    body: UpdateMeetingRequest,
    options?: { onSuccess?: () => void },
  ) => void;
  onAddPlace?: () => void;
  onSelectPlan?: (plan: PreLogPlan) => void;
  isDeletingPlan: boolean;
  deletePlanErrorMessage?: string;
  onDeletePlan: (planId: number, options?: { onSuccess?: () => void }) => void;
  onCancelDeletePlan: () => void;
  // pinned: 변경 후 상태
  onTogglePlanPin: (input: { planId: number; pinned: boolean }) => void;
  // liked: 변경 후 상태
  onTogglePlanLike: (input: { planId: number; liked: boolean }) => void;
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
  isUpdating,
  updateErrorMessage,
  onUpdate,
  onAddPlace,
  onSelectPlan,
  isDeletingPlan,
  deletePlanErrorMessage,
  onDeletePlan,
  onCancelDeletePlan,
  onTogglePlanPin,
  onTogglePlanLike,
}: PreLogViewProps) {
  const router = useRouter();
  const [mainTabIndex, setMainTabIndex] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState<PreLogFilter>("all");
  const [isEditingSummary, setIsEditingSummary] = useState(false);
  const [isEditDatesOpen, setIsEditDatesOpen] = useState(false);
  const [draft, setDraft] = useState(() => toDraft(meeting));
  const [deleteTarget, setDeleteTarget] = useState<PreLogPlan | null>(null);

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

  // 위치는 등록한 지도 링크를 새 탭으로 열고, 메모는 상세 화면으로 이동
  const handleSelectPlan = (plan: PreLogPlan) => {
    if (onSelectPlan) {
      onSelectPlan(plan);
      return;
    }
    if (plan.type === "LOCATION") {
      if (plan.url) window.open(plan.url, "_blank", "noopener,noreferrer");
      return;
    }
    router.push(`/pre-log/edit?meetingId=${meeting.meetingId}&planId=${plan.planId}`);
  };

  const handleTogglePin = (plan: PreLogPlan) => {
    onTogglePlanPin({ planId: plan.planId, pinned: !plan.pinned });
  };

  const handleToggleLike = (plan: PreLogPlan) => {
    onTogglePlanLike({ planId: plan.planId, liked: !plan.likedByMe });
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget || isDeletingPlan) return;
    onDeletePlan(deleteTarget.planId, { onSuccess: () => setDeleteTarget(null) });
  };

  const handleCancelDelete = () => {
    setDeleteTarget(null);
    onCancelDeletePlan();
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

          <PreLogPlanList
            meetingId={meeting.meetingId}
            filter={categoryFilter}
            onSelectPlan={handleSelectPlan}
            onDeletePlan={setDeleteTarget}
            onTogglePlanPin={handleTogglePin}
            onLikePlan={handleToggleLike}
          />
        </>
      ) : (
        <PreLogMapView
          meetingId={meeting.meetingId}
          onSelectPlan={handleSelectPlan}
          onDeletePlan={setDeleteTarget}
          onTogglePlanPin={handleTogglePin}
          onLikePlan={handleToggleLike}
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
          isDeleting={isDeletingPlan}
          errorMessage={deletePlanErrorMessage}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </main>
  );
}
