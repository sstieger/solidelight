import H from '@here/maps-api-for-javascript';

import { Place } from './Place';

export async function lookupPlace(platform: H.service.Platform, id: string): Promise<Place> {
  return new Promise((resolve, reject) => {
    platform.getSearchService().lookup(
      { id, lang: 'en-US' },
      (result) => resolve(result as Place),
      (err) => reject(err),
    );
  });
}
