import { format, parse } from "date-fns";

const DOT_DATE_FORMAT = "yyyy.MM.dd";

export function parseDotDate(value: string): Date {
  return parse(value, DOT_DATE_FORMAT, new Date());
}

export function formatDotDate(date: Date): string {
  return format(date, DOT_DATE_FORMAT);
}
