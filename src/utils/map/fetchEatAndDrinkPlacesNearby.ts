import { Place } from './Place';
import { EAT_AND_DRINK_CATEGORY_PREFIX } from './constants';
import { hereApiFetchConfig } from './hereApiFetchConfig';

interface ApiResult {
  items: Place[];
}

export async function fetchEatAndDrinkPlacesNearby(
  apiKey: string,
  lat: number,
  long: number,
  foodTypes: string[] = [],
  maxDistance = 10000,
  limit = 100,
): Promise<Place[]> {
  const at = `${lat},${long}`;
  const circle = `${at};r=${maxDistance}`;
  const categoriesStr = '100';
  const foodTypesQueryStr = foodTypes.length ? `&foodTypes=${encodeURIComponent(foodTypes.join(','))}` : '';
  const browseRes = await fetch(
    `https://browse.search.hereapi.com/v1/browse?apiKey=${encodeURIComponent(apiKey)}&at=${encodeURIComponent(
      at,
    )}&circle=${encodeURIComponent(circle)}&limit=${limit}&categories=${encodeURIComponent(
      categoriesStr,
    )}${foodTypesQueryStr}&lang=en-US`,
    hereApiFetchConfig,
  );
  return ((await browseRes.json()) as ApiResult).items
    .filter((item) => item.foodTypes?.length)
    .map((item) => {
      return {
        ...item,
        categories: item.categories.filter((category) => category.id.startsWith(EAT_AND_DRINK_CATEGORY_PREFIX)),
      };
    });
}
