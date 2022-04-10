export async function getCurrentPosition(params: PositionOptions): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (err) => reject(err),
      params,
    );
  });
}
