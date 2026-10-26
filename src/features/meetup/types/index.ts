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

// COMPLETED는 서버에 아직 없음. 백엔드가 완료 상태를 추가하면 바로 완료 배지가 표시되도록 미리 둠
export type LogStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

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
  // 만남장이 만남 종료를 누른 경우 true (일정 종료일과 무관)
  isEnded: boolean;
  canEditMeeting: boolean;
  // 만남장 + 미종료 + 시작일 이후 + 각 로그 1개 이상일 때 true
  canEndMeeting: boolean;
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

export type CandidateDateRange = MeetingDateRange & {
  id: number;
};

export type DatePollData = {
  meetingId: number;
  status: MeetingStatus;
  candidateDateRanges: CandidateDateRange[];
};

export type DatePollMember = {
  groupMemberId: number;
  nickname: string;
};

export type CandidateDateResult = MeetingDateRange & {
  candidateDateRangeId: number;
  rank: number;
  availableCount: number;
  availableMembers: DatePollMember[];
  unavailableMembers: DatePollMember[];
};

export type DatePollResultsData = {
  meetingId: number;
  // 만남 생성자도 응답 인원에 포함
  totalParticipantCount: number;
  respondedParticipantCount: number;
  candidateDateResults: CandidateDateResult[];
};

export type SubmitDatePollResponseRequest = {
  // 빈 배열이면 모든 후보 일정에 참석 불가
  candidateDateRangeIds: number[];
};

export type ConfirmMeetingDateRequest = {
  candidateDateRangeId: number;
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

export type UpdateMeetingRequest = {
  name: string;
  location: string | null;
  // 일정 조율 중인 만남은 null, 종료된 만남은 기존 일정을 그대로 전달
  startDate: string | null;
  endDate: string | null;
};

export type MeetingMembersData = {
  items: MeetingMemberDto[];
};

// 요청자가 참여자면 첫 번째, 나머지는 groupMemberId 오름차순
export type MeetingMemberDto = {
  // 결제 등록의 payerMemberId, participantMemberId로 사용
  groupMemberId: number;
  nickname: string;
  profileImageUrl: string | null;
  isMe: boolean;
};
