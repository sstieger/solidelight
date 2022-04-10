export function extractIdFromThingUrl(thingUrl: string): string {
  const parts = thingUrl.split('#');
  return parts[parts.length - 1];
}
