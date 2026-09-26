import type { PreLogCategory, PreLogFilter } from "@/features/pre-log/types";

export const PRE_LOG_CATEGORY_LABEL: Record<PreLogCategory, string> = {
  restaurant: "식당",
  cafe: "카페",
  stay: "숙소",
  etc: "기타",
};

export const PRE_LOG_FILTER_TABS: { key: PreLogFilter; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "pinned", label: "고정" },
  { key: "restaurant", label: "식당" },
  { key: "cafe", label: "카페" },
  { key: "stay", label: "숙소" },
  { key: "etc", label: "기타" },
];
