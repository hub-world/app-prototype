import { format, isThisYear, isSameMonth } from "date-fns";

/**
 * Formats a date range for display, e.g. "15 - 19 Oct" or "1 Jan - 8 Feb".
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
  
  // If same month, format as "15 - 19 Oct"
  if (isSameMonth(from!, to!)) {
    const fromDay = format(from!, "d");
    const toFormatted = formatDate(to!);
    return `${fromDay} - ${toFormatted}`;
  }
  
  return `${formatDate(from!)} - ${formatDate(to!)}`;
}
