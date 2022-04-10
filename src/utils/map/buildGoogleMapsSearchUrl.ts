export function buildGoogleMapsSearchUrl(query: string): string {
  const encodedQuery = encodeURIComponent(query);
  return `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;
}
