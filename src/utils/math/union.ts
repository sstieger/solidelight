export function union<T = string | number>(a: Set<T>, b: Set<T>): Set<T> {
  return new Set([...a, ...b]);
}
