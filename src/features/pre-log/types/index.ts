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

// LOCATION은 지원하는 지도 URL만, MEMO는 content만 입력
export type CreatePreLogPlanRequest =
  | {
      type: "LOCATION";
      category: PreLogCategory;
      title: string;
      url: string;
    }
  | {
      type: "MEMO";
      category: PreLogCategory;
      title: string;
      content: string;
    };

export type CreatePreLogPlanData = {
  planId: number;
  meetingId: number;
  creatorGroupMemberId: number;
  type: PreLogPlanType;
  category: PreLogCategory;
  title: string;
  url: string | null;
  content: string | null;
};

// 생성과 같은 형식으로 전체 내용을 덮어씀 (종료된 만남의 계획도 수정 가능)
export type UpdatePreLogPlanRequest = CreatePreLogPlanRequest;

export type UpdatePreLogPlanData = CreatePreLogPlanData;

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
