import type { PreLogCategory, PreLogFilter } from "@/features/pre-log/types";

export const PRE_LOG_CATEGORY_LABEL: Record<PreLogCategory, string> = {
  RESTAURANT: "식당",
  CAFE: "카페",
  ACCOMMODATION: "숙소",
  ACTIVITY: "액티비티",
  TRANSPORTATION: "교통",
  SHOPPING: "쇼핑",
  OTHER: "기타",
};

export const PRE_LOG_FILTER_TABS: { key: PreLogFilter; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "pinned", label: "고정" },
  { key: "RESTAURANT", label: "식당" },
  { key: "CAFE", label: "카페" },
  { key: "ACCOMMODATION", label: "숙소" },
  { key: "OTHER", label: "기타" },
];

export const PRE_LOG_TAG_OPTIONS = PRE_LOG_FILTER_TABS.filter(
  (tab): tab is { key: PreLogCategory; label: string } => tab.key !== "all" && tab.key !== "pinned",
);
