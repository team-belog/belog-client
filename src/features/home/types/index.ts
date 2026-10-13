import type { CalendarDay } from "@/lib/calendar";

export type ScheduleStatus = "before" | "ongoing" | "done";

export type Schedule = {
  id: number;
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
