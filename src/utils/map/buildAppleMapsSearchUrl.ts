export function buildAppleMapsSearchUrl(query: string): string {
  const encodedQuery = encodeURIComponent(query);
  return `https://maps.apple.com/?q=${encodedQuery}`;
}
