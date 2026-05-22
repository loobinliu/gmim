import { format } from "date-fns";

export const APP_TIMEZONE = process.env.APP_TIMEZONE || "Asia/Shanghai";

export function getTodayKey(date = new Date(), timeZone = APP_TIMEZONE) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function dateKeyToDate(dateKey: string) {
  return new Date(`${dateKey}T00:00:00.000Z`);
}

export function formatDisplayDate(date: Date) {
  return format(date, "yyyy-MM-dd");
}

export function isValidDateKey(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00.000Z`));
}
