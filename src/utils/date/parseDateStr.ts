export function parseDateStr(date: Date | string): Date {
  return typeof date === 'string' ? new Date(date) : date;
}
