export function intersect<T = string | number>(a: Set<T>, b: Set<T>): Set<T> {
  return new Set([...a].filter((val) => b.has(val)));
}
