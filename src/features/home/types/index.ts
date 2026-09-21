export type ScheduleStatus = "before" | "ongoing" | "done";

export type Schedule = {
  id: number;
  title: string;
  startDate: string; // "YYYY-MM-DD"
  endDate: string; // "YYYY-MM-DD"
  description: string;
  leaderName: string;
  memberCount: number;
  status: ScheduleStatus;
  photoUrl?: string;
  destinationCity?: string;
  destinationCountry?: string;
  memberHandles?: string[];
};

export type RangePosition = "single" | "start" | "middle" | "end";

export type CalendarDay = {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isPast?: boolean;
  schedules: Schedule[];
  rangePosition: RangePosition | null;
};
