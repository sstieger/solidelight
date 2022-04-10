export function calcDistanceScore(distance: number): number {
  if (distance > 5000) {
    return 0;
  }
  if (distance < 100) {
    return 1;
  }
  return 1 - (distance - 100) / 4900;
}
