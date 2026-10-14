import type { PreLogFilter } from "@/features/pre-log/types";

export const preLogKeys = {
  all: ["preLogs"] as const,
  main: (meetingId: number) => [...preLogKeys.all, "main", meetingId] as const,
  // 필터와 상관없이 해당 만남의 계획 목록 전체를 무효화할 때 사용
  allPlans: (meetingId: number) =>
    [...preLogKeys.all, "plans", meetingId] as const,
  plans: (meetingId: number, filter: PreLogFilter) =>
    [...preLogKeys.allPlans(meetingId), filter] as const,
};
