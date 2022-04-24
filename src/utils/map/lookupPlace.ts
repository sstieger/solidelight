import { Place } from './Place';
import { hereApiFetchConfig } from './hereApiFetchConfig';

export async function lookupPlace(apiKey: string, id: string): Promise<Place> {
  const lookupRes = await fetch(
    `https://lookup.search.hereapi.com/v1/lookup?apiKey=${encodeURIComponent(apiKey)}&id=${encodeURIComponent(
      id,
    )}&lang=en-US`,
    hereApiFetchConfig,
  );
  return await lookupRes.json();
}
