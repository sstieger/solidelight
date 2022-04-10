export type FullStars = 1 | 2 | 3 | 4 | 5;

export const validFullStarsNumbers = [1, 2, 3, 4, 5];

export function isFullStars(number: unknown): number is FullStars {
  return typeof number === 'number' && validFullStarsNumbers.includes(number);
}
