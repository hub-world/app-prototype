import { format, isThisYear } from "date-fns";

/**
 * Formats a date range for display, e.g. "1 Jan - 8 Jan" or "from 1 Jan".
 */
export function formatDateRange(
  from: Date | undefined,
  to: Date | undefined,
): string {
  const formatDate = (date: Date) =>
    format(date, isThisYear(date) ? "d MMM" : "d MMM yyyy");

  if (!from && !to) return "";
  if (from && !to) return `from ${formatDate(from)}`;
  if (!from && to) return `until ${formatDate(to)}`;
  return `${formatDate(from!)} - ${formatDate(to!)}`;
}
