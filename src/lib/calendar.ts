import { eachDayOfInterval, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek } from "date-fns";

// joint: 겹친 일정에서 한 일정의 시작/종료일이 다른 일정 사이에 있는 날 (원 + 양쪽 띠)
export type RangePosition = "single" | "start" | "middle" | "end" | "joint";

export type CalendarDay = {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isPast?: boolean;
  rangePosition: RangePosition | null;
  // 띠의 왼쪽/오른쪽 절반에 일정이 2개 이상 겹치는지
  overlappedSides?: { left: boolean; right: boolean };
};

/** month: 1~12 */
export function getMonthMatrix(year: number, month: number): Date[][] {
  const firstOfMonth = new Date(year, month - 1, 1);
  const gridStart = startOfWeek(startOfMonth(firstOfMonth));
  const gridEnd = endOfWeek(endOfMonth(firstOfMonth));

  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

  const weeks: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

export function getMonthLabel(date: Date): string {
  return format(date, "yyyy'년' M'월'");
}

export function toDateKey(date: Date): string {
  return format(date, "yyyy-MM-dd");
}
