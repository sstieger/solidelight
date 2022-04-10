import { parseDateStr } from './parseDateStr';

export function getLocalDateStr(date: Date | string): string {
  return parseDateStr(date).toLocaleDateString('en-US', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}
