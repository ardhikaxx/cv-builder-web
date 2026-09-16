/**
 * Formats date string to professional ATS resume format
 * e.g., "2024-02" -> "Feb 2024", "2024" -> "2024", or returns normalized text
 */
export function formatDateRange(
  startDate: string,
  endDate: string,
  isCurrent: boolean = false,
  currentLabel: string = 'Present'
): string {
  const start = startDate ? startDate.trim() : '';
  let end = endDate ? endDate.trim() : '';

  if (isCurrent) {
    end = currentLabel;
  }

  if (!start && !end) return '';
  if (start && !end) return start;
  if (!start && end) return end;
  return `${start} – ${end}`;
}

export function cleanUrl(url: string): string {
  if (!url) return '';
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}
