export type PreLogCategory = "restaurant" | "cafe" | "stay" | "etc";

export type MapPlanCategory = "RESTAURANT" | "CAFE" | "STAY" | "ETC";

export type MapPlan = {
  planId: number;
  category: MapPlanCategory;
  title: string;
  url: string;
  address: string;
  latitude: number;
  longitude: number;
  pinned: boolean;
  createdAt: string;
};

export type MapPlanListRequest = {
  meetingId: number;
  category?: MapPlanCategory;
  cursor?: string;
  size: number;
};

export type MapPlanListResponse = {
  items: MapPlan[];
  nextCursor: string | null;
  hasNext: boolean;
};

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
