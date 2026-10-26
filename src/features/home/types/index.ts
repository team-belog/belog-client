import type { CalendarDay } from "@/lib/calendar";

export type ScheduleStatus = "before" | "ongoing" | "done";

export type Schedule = {
  id: number;
  meetingId?: number;
  title: string;
  startDate: string; // "YYYY-MM-DD"
  endDate: string; // "YYYY-MM-DD"
  description: string;
  leaderName: string;
  memberCount: number;
  status: ScheduleStatus;
  photoUrl?: string;
  destinationCity?: string;
  destinationCountry?: string;
  memberHandles?: string[];
};

export type HomeCalendarMeeting = {
  meetingId: number;
  startDate: string;
  endDate: string;
};

export type HomeCalendarResponse = {
  yearMonth: string;
  today: string;
  hasUnreadNotification: boolean;
  meetings: HomeCalendarMeeting[];
};

export type HomeCalendarDay = CalendarDay & { meetings: HomeCalendarMeeting[] };

export type ProgressStatus = "SCHEDULING" | "UPCOMING" | "IN_PROGRESS";

export type ActiveMeetingParticipant = {
  groupMemberId: number;
  nickname: string;
  profileImageUrl: string | null;
};

export type ActiveMeeting = {
  meetingId: number;
  name: string;
  // 일정 조율 중(SCHEDULING)에는 null
  startDate: string | null;
  endDate: string | null;
  groupName: string;
  progressStatus: ProgressStatus;
  participantCount: number;
  previewParticipants: ActiveMeetingParticipant[];
};

export type ActiveMeetingsParams = {
  query?: string;
  cursor?: string;
  size?: number;
};

export type ActiveMeetingsData = {
  items: ActiveMeeting[];
  nextCursor: string | null;
  hasNext: boolean;
};

export type CompletedTicketParticipant = {
  groupMemberId: number;
  nickname: string;
};

export type CompletedTicket = {
  ticketId: number;
  meetingId: number;
  meetingName: string;
  memory: string;
  coverPhotoUrl: string | null;
  startDate: string; // "YYYY-MM-DD"
  endDate: string; // "YYYY-MM-DD"
  location: string;
  participants: CompletedTicketParticipant[];
};

export type CompletedTicketsParams = {
  cursor?: string;
  size?: number;
};

export type CompletedTicketsData = {
  items: CompletedTicket[];
  nextCursor: string | null;
  hasNext: boolean;
};
