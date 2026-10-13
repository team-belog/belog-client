"use client";

import { differenceInCalendarDays, format, parseISO } from "date-fns";
import { useState } from "react";
import { useRouter } from "next/navigation";

import BackHeader from "@/components/layout/BackHeader";
import TrashIcon from "@/components/ui/TrashIcon";
import MeetupDeleteModal from "@/features/meetup/components/MeetupDeleteModal";
import MeetupLogRow from "@/features/meetup/components/MeetupLogRow";
import MeetupSummary from "@/features/meetup/components/MeetupSummary";
import {
  BILL_LOG_STATUS_LABEL,
  POST_LOG_STATUS_LABEL,
  PRE_LOG_STATUS_LABEL,
} from "@/features/meetup/constants/logStatus";
import type {
  MeetingDetailData,
  UpdateMeetingRequest,
} from "@/features/meetup/types";
import PreLogDateRangeSheet from "@/features/pre-log/components/PreLogDateRangeSheet";
import { formatDateRange } from "@/lib/date";

const API_DATE_FORMAT = "yyyy-MM-dd";

interface MeetupDetailViewProps {
  meeting: MeetingDetailData;
  isUpdating: boolean;
  updateErrorMessage?: string;
  onUpdate: (
    body: UpdateMeetingRequest,
    options?: { onSuccess?: () => void },
  ) => void;
  isDeleting: boolean;
  deleteErrorMessage?: string;
  onDelete: () => void;
  onCancelDelete: () => void;
}

function toDraft(meeting: MeetingDetailData): UpdateMeetingRequest {
  return {
    name: meeting.meetingName,
    location: meeting.location,
    startDate: meeting.startDate,
    endDate: meeting.endDate,
  };
}

export default function MeetupDetailView({
  meeting,
  isUpdating,
  updateErrorMessage,
  onUpdate,
  isDeleting,
  deleteErrorMessage,
  onDelete,
  onCancelDelete,
}: MeetupDetailViewProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditDatesOpen, setIsEditDatesOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [draft, setDraft] = useState(() => toDraft(meeting));

  const { name, location, startDate, endDate } = isEditing
    ? draft
    : toDraft(meeting);
  const { logStatuses } = meeting;

  // 일정 조율 중인 만남은 일정이 없고, 종료된 만남은 일정을 바꿀 수 없음
  const isEnded =
    meeting.endDate !== null &&
    differenceInCalendarDays(parseISO(meeting.endDate), new Date()) < 0;
  const canEditDates = meeting.meetingStatus === "CONFIRMED" && !isEnded;

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

  const handleEdit = () => {
    if (isUpdating) return;

    if (!isEditing) {
      setDraft(toDraft(meeting));
      setIsEditing(true);
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
      { onSuccess: () => setIsEditing(false) },
    );
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    onCancelDelete();
  };

  const handleConfirmDates = (range: { startDate: Date; endDate: Date }) => {
    setDraft((prev) => ({
      ...prev,
      startDate: format(range.startDate, API_DATE_FORMAT),
      endDate: format(range.endDate, API_DATE_FORMAT),
    }));
    setIsEditDatesOpen(false);
  };

  return (
    <main>
      <BackHeader
        title="만남 상세"
        right={
          // 삭제도 수정과 같이 만남 생성자만 가능하므로 수정 권한으로 판단
          meeting.canEditMeeting && (
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(true)}
              aria-label="만남 삭제"
            >
              <TrashIcon variant="header" className="text-main-black" />
            </button>
          )
        }
      />
      <div className="h-2 w-full bg-[#F1F4F9] opacity-50" />

      <MeetupSummary
        meetup={summary}
        canEdit={meeting.canEditMeeting}
        isEditing={isEditing}
        onEdit={handleEdit}
        onTitleChange={(value) => setDraft((prev) => ({ ...prev, name: value }))}
        onLocationChange={(value) =>
          setDraft((prev) => ({ ...prev, location: value }))
        }
        onDateClick={canEditDates ? () => setIsEditDatesOpen(true) : undefined}
      />

      {isEditing && updateErrorMessage && (
        <p className="pretendard-m-12 px-4 pb-2 text-red-500">
          {updateErrorMessage}
        </p>
      )}

      <div className="h-2 w-full bg-[#F1F4F9] opacity-50" />

      <div className="flex flex-col">
        <MeetupLogRow
          iconSrc="/icons/meetup/pre-log.png"
          title="Pre-log"
          status={PRE_LOG_STATUS_LABEL[logStatuses.preLog]}
          description="만남 일정과 장소를 정해요"
          onClick={() => router.push("/pre-log")}
        />
        <MeetupLogRow
          iconSrc="/icons/meetup/bill-log.png"
          title="Bill-log"
          status={BILL_LOG_STATUS_LABEL[logStatuses.billLog]}
          description="영수증으로 정산해요"
          onClick={() => router.push(`/bill-log?meetingId=${meeting.meetingId}&groupId=${meeting.groupId}`)}
        />
        <MeetupLogRow
          iconSrc="/icons/post-log.png"
          title="Post-log"
          status={POST_LOG_STATUS_LABEL[logStatuses.postLog]}
          description="사진을 기록하고 티켓을 생성해요"
          onClick={() => router.push(`/post-log?meetingId=${meeting.meetingId}`)}
        />
      </div>

      {isEditDatesOpen && draft.startDate && draft.endDate && (
        <PreLogDateRangeSheet
          startDate={parseISO(draft.startDate)}
          endDate={parseISO(draft.endDate)}
          onCancel={() => setIsEditDatesOpen(false)}
          onConfirm={handleConfirmDates}
        />
      )}

      {isDeleteModalOpen && (
        <MeetupDeleteModal
          meetingName={meeting.meetingName}
          isDeleting={isDeleting}
          errorMessage={deleteErrorMessage}
          onCancel={handleCancelDelete}
          onConfirm={onDelete}
        />
      )}
    </main>
  );
}
