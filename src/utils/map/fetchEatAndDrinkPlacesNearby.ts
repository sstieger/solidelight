import H from '@here/maps-api-for-javascript';

import { Place } from './Place';
import { EAT_AND_DRINK_CATEGORY_PREFIX } from './constants';

interface ApiResult {
  items: Place[];
}

export async function fetchEatAndDrinkPlacesNearby(
  platform: H.service.Platform,
  lat: number,
  long: number,
  foodTypes: string[] = [],
  maxDistance = 10000,
  limit = 100,
): Promise<Place[]> {
  return new Promise((resolve, reject) => {
    const browseParams = {
      at: `${lat},${long}`,
      circle: `${lat},${long};r=${maxDistance}`,
      limit,
      categories: ['100'],
      lang: 'en-US',
    };
    platform.getSearchService().browse(
      foodTypes.length ? { ...browseParams, foodTypes } : browseParams,
      (result) => {
        resolve(
          (result as ApiResult).items
            .filter((item) => item.foodTypes?.length)
            .map((item) => {
              return {
                ...item,
                categories: item.categories.filter((category) => category.id.startsWith(EAT_AND_DRINK_CATEGORY_PREFIX)),
              };
            }),
        );
      },
      (err) => reject(err),
    );
  });
}
