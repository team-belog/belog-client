import type { PreLogFilter } from "@/features/pre-log/types";

export const preLogKeys = {
  all: ["preLogs"] as const,
  main: (meetingId: number) => [...preLogKeys.all, "main", meetingId] as const,
  plans: (meetingId: number, filter: PreLogFilter) =>
    [...preLogKeys.all, "plans", meetingId, filter] as const,
};
