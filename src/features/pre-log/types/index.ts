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
