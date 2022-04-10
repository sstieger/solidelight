export function sortArrayByStrFieldAsc<T>(array: T[], getString: (obj: T) => string): T[] {
  return array.slice().sort((a, b) => getString(a).localeCompare(getString(b)));
}
