import type { MeetingStatus } from "@/features/meetup/types";

export type PreLogCategory =
  | "RESTAURANT"
  | "CAFE"
  | "ACCOMMODATION"
  | "ACTIVITY"
  | "TRANSPORTATION"
  | "SHOPPING"
  | "OTHER";

export type PreLogFilter = "all" | "pinned" | PreLogCategory;

export type PreLogPlanType = "LOCATION" | "MEMO";

export type PreLogPlan = {
  planId: number;
  type: PreLogPlanType;
  category: PreLogCategory;
  title: string;
  // LOCATION만 값이 있음
  url: string | null;
  // LOCATION은 추출한 주소(없으면 null), MEMO는 본문 전체
  content: string | null;
  thumbnailUrl: string | null;
  likeCount: number;
  likedByMe: boolean;
  pinned: boolean;
  canDelete: boolean;
  createdAt: string;
};

export type PreLogPlansRequest = {
  category?: PreLogCategory;
  pinnedOnly?: boolean;
  cursor?: string;
  size?: number;
};

// 고정 계획 우선, 계획 ID 역순
export type PreLogPlansData = {
  items: PreLogPlan[];
  nextCursor: string | null;
  hasNext: boolean;
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
