import { deleteContainer } from '@inrupt/solid-client';

import { FetchFn } from '@/utils/solid/FetchFn';

import { deleteDataset as deletePlaceReviewsDataset } from './placeReviews';
import { deleteDataset as deletePlacesDataset } from './places';
import { deletePreferences } from './preferences';
import { deleteDataset as deleteProfileDataset } from './profile';

export async function deleteData(
  containerUrl: string,
  preferencesFileUrl: string,
  webId: string,
  fetch: FetchFn,
): Promise<void> {
  await Promise.all([
    deletePlaceReviewsDataset(containerUrl, fetch),
    deletePlacesDataset(containerUrl, fetch),
    deleteProfileDataset(containerUrl, fetch),
    deletePreferences(preferencesFileUrl, webId, fetch),
  ]);
  await deleteContainer(containerUrl, { fetch });
}
