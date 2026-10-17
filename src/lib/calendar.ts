import { eachDayOfInterval, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek } from "date-fns";

export type RangePosition = "single" | "start" | "middle" | "end";

export type CalendarDay = {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isPast?: boolean;
  rangePosition: RangePosition | null;
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
