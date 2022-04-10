import {
  ThingPersisted,
  getDatetime,
  getInteger,
  getSolidDataset,
  getStringEnglish,
  getThing,
  getThingAll,
  getUrl,
} from '@inrupt/solid-client';

import config from '@/config';
import { FullStars } from '@/model/FullStars';
import { PersistentPlaceReviewWithPlace } from '@/model/PersistentPlaceReviewWithPersistentPlace';
import { creator, dateCreated, dateModified, place as placeUri, rating, review } from '@/namespace/placeReview';
import { placeReview as placeReviewLink } from '@/namespace/placeReviewLink';
import { Place } from '@/utils/map/Place';
import { buildAddressStr } from '@/utils/map/buildAddressStr';
import { joinPathParts } from '@/utils/path/joinPathParts';
import { FetchFn } from '@/utils/solid/FetchFn';
import { extractIdFromThingUrl } from '@/utils/solid/extractIdFromThingUrl';

export async function getReviewsForHereId(
  hereId: string,
  place: Place,
  fetch: FetchFn,
): Promise<PersistentPlaceReviewWithPlace[]> {
  try {
    const dataset = await getSolidDataset(getDatasetUrl(hereId), { fetch });
    return (
      await Promise.allSettled(
        getThingAll(dataset).map((reviewLinkThing) => getReview(reviewLinkThing, hereId, place, fetch)),
      )
    )
      .filter((res): res is PromiseFulfilledResult<PersistentPlaceReviewWithPlace> => res.status === 'fulfilled')
      .map((res) => res.value);
  } catch (err) {
    return [];
  }
}

async function getReview(
  reviewLinkThing: ThingPersisted,
  hereId: string,
  place: Place,
  fetch: FetchFn,
): Promise<PersistentPlaceReviewWithPlace> {
  const reviewUrl = getUrl(reviewLinkThing, placeReviewLink) as string;
  const reviewDataset = await getSolidDataset(reviewUrl, { fetch });
  const thing = getThing(reviewDataset, reviewUrl) as ThingPersisted;
  return buildReviewFromThing(thing, hereId, place);
}

function buildReviewFromThing(thing: ThingPersisted, hereId: string, place: Place): PersistentPlaceReviewWithPlace {
  return {
    _url: thing.url,
    id: extractIdFromThingUrl(thing.url),
    creatorWebId: getUrl(thing, creator) as string,
    dateCreated: getDatetime(thing, dateCreated) as Date,
    dateModified: getDatetime(thing, dateModified) as Date,
    placeUrl: getUrl(thing, placeUri) as string,
    place: {
      ...place,
      _url: getUrl(thing, placeUri) as string,
      address: buildAddressStr(place.address),
      hereId,
      categories: place.categories.map((cat) => cat.id),
      foodTypes: place.foodTypes.map((type) => type.id),
      latitude: place.position.lat,
      longitude: place.position.lng,
    },
    rating: getInteger(thing, rating) as FullStars,
    review: getStringEnglish(thing, review),
  };
}

function getDatasetUrl(hereId: string): string {
  const HERE_ID_PREFIX = 'here:pds:place:';
  const hereIdWithoutPrefix = hereId.slice(HERE_ID_PREFIX.length);
  return joinPathParts([config.defaultConnectNodeIndexUrl, 'here/pds/place/', hereIdWithoutPrefix]);
}
