import H from '@here/maps-api-for-javascript';

import { Place } from './Place';
import { EAT_AND_DRINK_CATEGORY_PREFIX } from './constants';

interface ApiResult {
  items: Place[];
}

export async function autocompleteEatAndDrinkPlaces(
  platform: H.service.Platform,
  search: string,
  lat: number,
  long: number,
  limit = 15,
): Promise<Place[]> {
  return new Promise((resolve, reject) => {
    platform.getSearchService().autosuggest(
      {
        at: `${lat},${long}`,
        limit,
        q: search,
        resultTypes: ['place'],
        lang: 'en-US',
      },
      (result) => {
        resolve(
          (result as ApiResult).items
            .map((item) => {
              return {
                ...item,
                categories: item.categories.filter((category) => category.id.startsWith(EAT_AND_DRINK_CATEGORY_PREFIX)),
              };
            })
            .filter((item) => item.categories.length > 0 && item.foodTypes && item.foodTypes.length > 0),
        );
      },
      (err) => reject(err),
    );
  });
}
