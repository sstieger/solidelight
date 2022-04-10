import { getSolidDatasetWithAcl } from '@inrupt/solid-client';

import { FetchFn } from '@/utils/solid/FetchFn';
import { getPublicResourceReadAccess } from '@/utils/solid/acl/getPublicResourceReadAccess';
import { setPublicResourceReadAccess } from '@/utils/solid/acl/setPublicResourceReadAccess';

import { getDatasetUrl as getPlaceReviewsDatasetUrl } from './placeReviews';
import { getDatasetUrl as getPlacesDatasetUrl } from './places';
import { getDatasetUrl as getProfileDatasetUrl } from './profile';

export async function getPublicReadAccess(containerUrl: string, fetch: FetchFn): Promise<boolean> {
  const profileDatasetUrl = getProfileDatasetUrl(containerUrl);
  const placesDatasetUrl = getPlacesDatasetUrl(containerUrl);
  const placeReviewsDatasetUrl = getPlaceReviewsDatasetUrl(containerUrl);
  const [a, b, c] = await Promise.all([
    getPublicReadAccessForDataset(profileDatasetUrl, fetch),
    getPublicReadAccessForDataset(placesDatasetUrl, fetch),
    getPublicReadAccessForDataset(placeReviewsDatasetUrl, fetch),
  ]);
  return a && b && c;
}

async function getPublicReadAccessForDataset(datasetUrl: string, fetch: FetchFn): Promise<boolean> {
  const datasetWithAcl = await getSolidDatasetWithAcl(datasetUrl, { fetch });
  return getPublicResourceReadAccess(datasetWithAcl);
}

export async function setPublicReadAccess(
  publicReadAccess: boolean,
  containerUrl: string,
  webId: string,
  fetch: FetchFn,
): Promise<void> {
  const profileDatasetUrl = getProfileDatasetUrl(containerUrl);
  const placesDatasetUrl = getPlacesDatasetUrl(containerUrl);
  const placeReviewsDatasetUrl = getPlaceReviewsDatasetUrl(containerUrl);
  await Promise.all([
    setPublicReadAccessForDataset(profileDatasetUrl, webId, publicReadAccess, fetch),
    setPublicReadAccessForDataset(placesDatasetUrl, webId, publicReadAccess, fetch),
    setPublicReadAccessForDataset(placeReviewsDatasetUrl, webId, publicReadAccess, fetch),
  ]);
}

async function setPublicReadAccessForDataset(
  datasetUrl: string,
  webId: string,
  publicReadAccess: boolean,
  fetch: FetchFn,
): Promise<void> {
  const updatedDatasetWithAcl = await getSolidDatasetWithAcl(datasetUrl, { fetch });
  await setPublicResourceReadAccess(updatedDatasetWithAcl, publicReadAccess, webId, fetch);
}
