import { format, isSameDay, parseISO } from "date-fns";

type DateRange = {
  startDate: string;
  endDate: string;
};

export function formatDateRange({ startDate, endDate }: DateRange): string {
  const start = parseISO(startDate);
  const end = parseISO(endDate);

  if (isSameDay(start, end)) {
    return format(start, "yyyy.MM.dd");
  }

  return `${format(start, "yyyy.MM.dd")} - ${format(end, "yyyy.MM.dd")}`;
}
