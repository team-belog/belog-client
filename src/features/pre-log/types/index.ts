import type { MeetingStatus } from "@/features/meetup/types";

export type PreLogCategory = "restaurant" | "cafe" | "stay" | "etc";

export type PreLogFilter = "all" | "pinned" | PreLogCategory;

export type PreLogPlace = {
  id: number;
  category: PreLogCategory;
  title: string;
  address: string;
  likeCount: number;
  isPinned: boolean;
  thumbnailUrl?: string;
};

export type PreLogMainData = {
  meetingId: number;
  meetingName: string;
  groupId: number;
  groupName: string;
  meetingStatus: MeetingStatus;
  // 일정 조율 중(SCHEDULING)에는 null
  startDate: string | null;
  endDate: string | null;
  // 미등록 시 null
  location: string | null;
  isEnded: boolean;
  canEditMeeting: boolean;
};
