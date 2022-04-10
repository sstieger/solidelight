import { ThingPersisted, buildThing, createThing, getDatetime, getUrl } from '@inrupt/solid-client';
import { Type, failure, success } from 'io-ts';
import { rdf } from 'rdf-namespaces';

import { PersistentProfile } from '@/model/PersistentProfile';
import {
  Profile as ProfileUri,
  creator as creatorUri,
  dateCreated as dateCreatedUri,
  dateModified as dateModifiedUri,
  reviews as reviewsUri,
} from '@/namespace/profile';

export const profileCodec = new Type<PersistentProfile, ThingPersisted, ThingPersisted>(
  'profile',
  (thing): thing is PersistentProfile => true,
  (thing, context) => {
    const _url = thing.url;
    const type = getUrl(thing, rdf.type);
    const creator = getUrl(thing, creatorUri);
    if (creator === null) {
      return failure(thing, context, 'creator is not a valid URL');
    }
    if (type !== ProfileUri) {
      return failure(thing, context, 'type is not profile');
    }
    const dateCreated = getDatetime(thing, dateCreatedUri);
    if (dateCreated === null) {
      return failure(thing, context, 'dateCreated is not a valid date');
    }
    const dateModified = getDatetime(thing, dateModifiedUri);
    if (dateModified === null) {
      return failure(thing, context, 'dateModified is not a valid date');
    }
    const reviews = getUrl(thing, reviewsUri);
    if (reviews === null) {
      return failure(thing, context, 'reviews is not a valid URL');
    }
    return success({
      _url,
      creator,
      dateCreated,
      dateModified,
      reviews,
    });
  },
  (profile) => {
    return buildThing(createThing({ url: profile._url }))
      .setUrl(rdf.type, ProfileUri)
      .setUrl(creatorUri, profile.creator)
      .setDatetime(dateCreatedUri, profile.dateCreated)
      .setDatetime(dateModifiedUri, profile.dateModified)
      .setUrl(reviewsUri, profile.reviews)
      .build();
  },
);
