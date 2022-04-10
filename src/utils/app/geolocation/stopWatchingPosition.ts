export function stopWatchingPosition(watchId: number): void {
  navigator.geolocation.clearWatch(watchId);
}
