export function sortArrayByNumberFieldDesc<T>(array: T[], getNumber: (obj: T) => number): T[] {
  return array.slice().sort((a, b) => getNumber(b) - getNumber(a));
}
