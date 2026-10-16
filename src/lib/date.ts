import {
  differenceInMinutes,
  format,
  formatDistanceToNowStrict,
  isSameDay,
  parseISO,
} from "date-fns";
import { ko } from "date-fns/locale";

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

// 예: "10월 3일 (토)" / "10월 3일 (토) - 10월 4일 (일)"
export function formatKoreanDateRange({
  startDate,
  endDate,
}: DateRange): string {
  const start = parseISO(startDate);
  const end = parseISO(endDate);
  const pattern = "M월 d일 (EEE)";

  if (isSameDay(start, end)) {
    return format(start, pattern, { locale: ko });
  }

  return `${format(start, pattern, { locale: ko })} - ${format(end, pattern, { locale: ko })}`;
}

// 예: "방금 전" / "5분 전" / "1일 전"
export function formatRelativeTime(dateTime: string): string {
  const date = parseISO(dateTime);

  if (differenceInMinutes(new Date(), date) < 1) return "방금 전";

  return formatDistanceToNowStrict(date, { addSuffix: true, locale: ko });
}
