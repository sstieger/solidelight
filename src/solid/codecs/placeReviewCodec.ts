import {
  ThingPersisted,
  buildThing,
  createThing,
  getDatetime,
  getInteger,
  getStringEnglish,
  getUrl,
} from '@inrupt/solid-client';
import { Type, failure, success } from 'io-ts';
import { rdf } from 'rdf-namespaces';

import { isFullStars } from '@/model/FullStars';
import { PersistentPlaceReview } from '@/model/PersistentPlaceReview';
import {
  PlaceReview as PlaceReviewUri,
  creator as creatorUri,
  dateCreated as dateCreatedUri,
  dateModified as dateModifiedUri,
  place as placeUri,
  rating as ratingUri,
  review as reviewUri,
} from '@/namespace/placeReview';
import { extractIdFromThingUrl } from '@/utils/solid/extractIdFromThingUrl';

export const placeReviewCodec = new Type<PersistentPlaceReview, ThingPersisted, ThingPersisted>(
  'place review',
  (thing): thing is PersistentPlaceReview => true,
  (thing, context) => {
    const _url = thing.url;
    const type = getUrl(thing, rdf.type);
    if (type !== PlaceReviewUri) {
      return failure(thing, context, 'type is not place review');
    }
    const id = extractIdFromThingUrl(thing.url);
    const creatorWebId = getUrl(thing, creatorUri);
    if (creatorWebId === null) {
      return failure(thing, context, 'creator is not a valid URL');
    }
    const placeUrl = getUrl(thing, placeUri);
    if (placeUrl === null) {
      return failure(thing, context, 'place is not a valid URL');
    }
    const dateCreated = getDatetime(thing, dateCreatedUri);
    if (dateCreated === null) {
      return failure(thing, context, 'dateCreated is not a valid date');
    }
    const dateModified = getDatetime(thing, dateModifiedUri);
    if (dateModified === null) {
      return failure(thing, context, 'dateModified is not a valid date');
    }
    const rating = getInteger(thing, ratingUri);
    if (rating === null || !isFullStars(rating)) {
      return failure(thing, context, 'rating is not a valid number');
    }
    const review = getStringEnglish(thing, reviewUri);
    return success({
      _url,
      id,
      creatorWebId,
      placeUrl,
      dateCreated,
      dateModified,
      rating,
      review,
    });
  },
  (review) => {
    const builder = buildThing(createThing({ url: review._url }));
    builder
      .setUrl(rdf.type, PlaceReviewUri)
      .setUrl(creatorUri, review.creatorWebId)
      .setDatetime(dateCreatedUri, review.dateCreated)
      .setDatetime(dateModifiedUri, review.dateModified)
      .setUrl(placeUri, review.placeUrl)
      .setInteger(ratingUri, review.rating);
    if (review.review) {
      builder.setStringEnglish(reviewUri, review.review);
    }
    return builder.build();
  },
);
