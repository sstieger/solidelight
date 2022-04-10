export function isValidUrl(maybeUrl: string): boolean {
  if (maybeUrl.trim() === '') {
    return false;
  }
  try {
    const url = new URL(maybeUrl);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
}
