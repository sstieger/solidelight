import { Place } from './Place';
import { EAT_AND_DRINK_CATEGORY_PREFIX } from './constants';
import { hereApiFetchConfig } from './hereApiFetchConfig';

interface ApiResult {
  items: Place[];
}

export async function autocompleteEatAndDrinkPlaces(
  apiKey: string,
  search: string,
  lat: number,
  long: number,
  limit = 15,
): Promise<Place[]> {
  const at = `${lat},${long}`;
  const autosuggestRes = await fetch(
    `https://autosuggest.search.hereapi.com/v1/autosuggest?apikey=${encodeURIComponent(apiKey)}&at=${encodeURIComponent(
      at,
    )}&limit=${limit}&q=${encodeURIComponent(search)}&resultTypes=place&lang=en-US`,
    hereApiFetchConfig,
  );
  return ((await autosuggestRes.json()) as ApiResult).items
    .map((item) => {
      return {
        ...item,
        categories: item.categories.filter((category) => category.id.startsWith(EAT_AND_DRINK_CATEGORY_PREFIX)),
      };
    })
    .filter((item) => item.categories.length > 0 && item.foodTypes && item.foodTypes.length > 0);
}
