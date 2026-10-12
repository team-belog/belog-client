export type MeetupStartOption = "coordinate" | "fixedDate";

// MeetupSummary에 표시할 정보 (Pre-log 화면과 공유)
export type MeetupSummaryInfo = {
  title: string;
  groupName: string;
  dDay: number | null;
  startDate: string;
  endDate: string;
  location: string;
};

export type MeetupDetail = MeetupSummaryInfo & {
  id: number;
  preLogStatus: string;
  billLogStatus: string;
  postLogStatus: string;
};

export type MeetingScheduleType = "FIXED" | "POLL";

export type MeetingStatus = "SCHEDULING" | "CONFIRMED";

export type LogStatus = "NOT_STARTED" | "IN_PROGRESS";

export type MeetingDetailData = {
  meetingId: number;
  groupId: number;
  groupName: string;
  meetingName: string;
  scheduleType: MeetingScheduleType;
  meetingStatus: MeetingStatus;
  // 일정 조율 중(SCHEDULING)에는 null
  startDate: string | null;
  endDate: string | null;
  // 미등록 시 null
  location: string | null;
  canEditMeeting: boolean;
  logStatuses: {
    preLog: LogStatus;
    billLog: LogStatus;
    postLog: LogStatus;
  };
};

export type MeetingDateRange = {
  startDate: string;
  endDate: string;
};

export type CreateMeetingRequest = {
  name: string;
  location: string | null;
  // 생성자는 자동으로 포함되므로 같은 그룹의 다른 멤버 ID만 전달
  participantMemberIds: number[];
  schedule: {
    type: MeetingScheduleType;
    // FIXED는 1개, POLL은 2~10개
    dateRanges: MeetingDateRange[];
  };
};

export type CreateMeetingData = {
  meetingId: number;
};
