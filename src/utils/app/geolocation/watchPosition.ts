import { GEOLOCATION_POSITION_PARAMS } from '@/constants';

export function watchPosition(foundPositionFn: (position: GeolocationPosition) => void): number {
  return navigator.geolocation.watchPosition(
    (position) => foundPositionFn(position),
    null,
    GEOLOCATION_POSITION_PARAMS,
  );
}
