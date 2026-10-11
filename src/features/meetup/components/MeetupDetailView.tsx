"use client";

import { differenceInCalendarDays, parseISO } from "date-fns";
import { useRouter } from "next/navigation";

import BackHeader from "@/components/layout/BackHeader";
import MeetupLogRow from "@/features/meetup/components/MeetupLogRow";
import MeetupSummary from "@/features/meetup/components/MeetupSummary";
import {
  BILL_LOG_STATUS_LABEL,
  POST_LOG_STATUS_LABEL,
  PRE_LOG_STATUS_LABEL,
} from "@/features/meetup/constants/logStatus";
import type { MeetingDetailData } from "@/features/meetup/types";
import { formatDateRange } from "@/lib/date";

interface MeetupDetailViewProps {
  meeting: MeetingDetailData;
}

export default function MeetupDetailView({ meeting }: MeetupDetailViewProps) {
  const router = useRouter();
  const { startDate, endDate, logStatuses } = meeting;

  const summary = {
    title: meeting.meetingName,
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
    location: meeting.location ?? "",
  };

  return (
    <main>
      <BackHeader title="만남 상세" />
      <div className="h-2 w-full bg-[#F1F4F9] opacity-50" />

      <MeetupSummary meetup={summary} canEdit={meeting.canEditMeeting} />

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
          onClick={() => router.push("/bill-log")}
        />
        <MeetupLogRow
          iconSrc="/icons/post-log.png"
          title="Post-log"
          status={POST_LOG_STATUS_LABEL[logStatuses.postLog]}
          description="사진을 기록하고 티켓을 생성해요"
          onClick={() => router.push("/post-log")}
        />
      </div>
    </main>
  );
}
