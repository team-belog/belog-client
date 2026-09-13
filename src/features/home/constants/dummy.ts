import type { Schedule } from "@/features/home/types";

export const DEFAULT_SELECTED_DATE = "2026-08-18";

export const DUMMY_SCHEDULES: Schedule[] = [
  {
    id: 1,
    title: "당일치기 광주 여행",
    startDate: "2026-08-03",
    endDate: "2026-08-03",
    status: "done",
  },
  {
    id: 2,
    title: "2박 3일 광주 여행",
    startDate: "2026-08-10",
    endDate: "2026-08-12",
    status: "done",
  },
  {
    id: 3,
    title: "1박 2일 광주 여행",
    startDate: "2026-08-20",
    endDate: "2026-08-21",
    status: "before",
  },
  {
    id: 4,
    title: "당일치기 광주 여행",
    startDate: "2026-08-30",
    endDate: "2026-08-30",
    status: "before",
  },
];
