import {
  SolidDataset,
  ThingPersisted,
  createSolidDataset,
  deleteSolidDataset,
  getSolidDataset,
  getThingAll,
  removeThing,
  saveSolidDatasetAt,
  setThing,
} from '@inrupt/solid-client';

import { PersistentPlace } from '@/model/PersistentPlace';
import { PersistentPlaceReview } from '@/model/PersistentPlaceReview';
import { PersistentPlaceReviewWithPlace } from '@/model/PersistentPlaceReviewWithPersistentPlace';
import { Place } from '@/model/Place';
import { PlaceReviewWithoutPlaceUrl } from '@/model/PlaceReviewWithoutPlaceUrl';
import { joinPathParts } from '@/utils/path/joinPathParts';
import { FetchFn } from '@/utils/solid/FetchFn';
import { generateUuid } from '@/utils/uuid/generateUuid';

import { placeReviewCodec } from './codecs/placeReviewCodec';
import { addPlace, getPlaces } from './places';

export async function getReviews(containerUrl: string, fetch: FetchFn): Promise<PersistentPlaceReviewWithPlace[]> {
  const [reviewsDataset, places] = await Promise.all([getDataset(containerUrl, fetch), getPlaces(containerUrl, fetch)]);
  return getReviewsFromDatasetAndPlaces(reviewsDataset, places);
}

function getReviewsFromDatasetAndPlaces(
  reviewsDataset: SolidDataset,
  places: PersistentPlace[],
): PersistentPlaceReviewWithPlace[] {
  return getThingAll(reviewsDataset)
    .map((thing) => buildReviewFromThing(thing, places))
    .filter((review): review is PersistentPlaceReviewWithPlace => review !== null);
}

export async function addReview(
  review: PlaceReviewWithoutPlaceUrl,
  place: Place,
  containerUrl: string,
  fetch: FetchFn,
): Promise<PersistentPlaceReviewWithPlace> {
  const existingPlaces = await getPlaces(containerUrl, fetch);
  const [dataset, persistentPlace] = await Promise.all([
    getDataset(containerUrl, fetch),
    createPlaceIfRequiredAndGetPlaceUrl(place, existingPlaces, containerUrl, fetch),
  ]);
  const id = generateUuid();
  const _url = buildThingUrl(id, containerUrl);
  const placeUrl = persistentPlace._url;
  const persistentReview: PersistentPlaceReview = { _url, id, placeUrl, ...review };
  const thing = placeReviewCodec.encode(persistentReview);
  const updatedDataset = setThing(dataset, thing);
  await updateDataset(updatedDataset, containerUrl, fetch);
  return { ...persistentReview, place: persistentPlace };
}

async function createPlaceIfRequiredAndGetPlaceUrl(
  place: Place,
  existingPlaces: PersistentPlace[],
  containerUrl: string,
  fetch: FetchFn,
): Promise<PersistentPlace> {
  const existingPlace = existingPlaces.find(({ hereId }) => hereId === place.hereId);
  return existingPlace ?? addPlace(place, containerUrl, fetch);
}

function buildReviewFromThing(thing: ThingPersisted, places: PersistentPlace[]): PersistentPlaceReviewWithPlace | null {
  const decoded = placeReviewCodec.decode(thing);
  if (decoded._tag === 'Left') {
    return null;
  }
  const review = decoded.right;
  const place = places.find(({ _url }) => _url === review.placeUrl);
  return place ? { ...review, place } : null;
}

export async function updateReview(
  review: PersistentPlaceReview,
  containerUrl: string,
  fetch: FetchFn,
): Promise<SolidDataset> {
  const thing = placeReviewCodec.encode(review);
  const updatedDataset = setThing(await getDataset(containerUrl, fetch), thing);
  return await updateDataset(updatedDataset, containerUrl, fetch);
}

export async function deleteReview(reviewId: string, containerUrl: string, fetch: FetchFn): Promise<SolidDataset> {
  const updatedDataset = removeThing(await getDataset(containerUrl, fetch), buildThingUrl(reviewId, containerUrl));
  return await updateDataset(updatedDataset, containerUrl, fetch);
}

async function getDataset(containerUrl: string, fetch: FetchFn): Promise<SolidDataset> {
  try {
    return await getSolidDataset(getDatasetUrl(containerUrl), { fetch });
  } catch (err) {
    if ((err as { statusCode: number }).statusCode === 404) {
      const dataset = createSolidDataset();
      await updateDataset(dataset, containerUrl, fetch);
      return await getDataset(containerUrl, fetch);
    } else {
      throw err;
    }
  }
}

async function updateDataset(dataset: SolidDataset, containerUrl: string, fetch: FetchFn): Promise<SolidDataset> {
  return await saveSolidDatasetAt(getDatasetUrl(containerUrl), dataset, { fetch });
}

export async function deleteDataset(containerUrl: string, fetch: FetchFn): Promise<void> {
  await deleteSolidDataset(getDatasetUrl(containerUrl), { fetch });
}

function buildThingUrl(reviewId: string, containerUrl: string): string {
  return `${getDatasetUrl(containerUrl)}#${reviewId}`;
}

export function getDatasetUrl(containerUrl: string): string {
  return joinPathParts([containerUrl, 'placeReviews']);
}
