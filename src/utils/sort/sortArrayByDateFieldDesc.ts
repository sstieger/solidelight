import { parseDateStr } from '@/utils/date/parseDateStr';

export function sortArrayByDateFieldDesc<T>(array: T[], getDate: (obj: T) => Date | string): T[] {
  return array.slice().sort((a, b) => {
    const dateA = parseDateStr(getDate(a));
    const dateB = parseDateStr(getDate(b));
    return dateB.getTime() - dateA.getTime();
  });
}
