import {
  ThingPersisted,
  buildThing,
  createThing,
  getDecimal,
  getStringNoLocale,
  getStringNoLocaleAll,
  getUrl,
} from '@inrupt/solid-client';
import { Type, failure, success } from 'io-ts';
import { rdf } from 'rdf-namespaces';

import { PersistentPlace } from '@/model/PersistentPlace';
import {
  Place as PlaceUri,
  address as addressUri,
  category as categoryUri,
  foodType as foodTypeUri,
  hereId as hereIdUri,
  latitude as latitudeUri,
  longitude as longitudeUri,
  title as titleUri,
} from '@/namespace/place';
import { extractIdFromThingUrl } from '@/utils/solid/extractIdFromThingUrl';

export const placeCodec = new Type<PersistentPlace, ThingPersisted, ThingPersisted>(
  'place',
  (thing): thing is PersistentPlace => true,
  (thing, context) => {
    const _url = thing.url;
    const type = getUrl(thing, rdf.type);
    if (type !== PlaceUri) {
      return failure(thing, context, 'type is not place');
    }
    const id = extractIdFromThingUrl(thing.url);
    const hereId = getStringNoLocale(thing, hereIdUri);
    if (hereId === null) {
      return failure(thing, context, 'hereId is not a valid string');
    }
    const title = getStringNoLocale(thing, titleUri);
    if (title === null) {
      return failure(thing, context, 'title is not a valid string');
    }
    const address = getStringNoLocale(thing, addressUri);
    if (address === null) {
      return failure(thing, context, 'address is not a valid string');
    }
    const latitude = getDecimal(thing, latitudeUri);
    if (latitude === null) {
      return failure(thing, context, 'latitude is not a valid number');
    }
    const longitude = getDecimal(thing, longitudeUri);
    if (longitude === null) {
      return failure(thing, context, 'longitude is not a valid number');
    }
    const categories = getStringNoLocaleAll(thing, categoryUri);
    const foodTypes = getStringNoLocaleAll(thing, foodTypeUri);
    return success({
      _url,
      id,
      hereId,
      title,
      address,
      latitude,
      longitude,
      categories,
      foodTypes,
    });
  },
  (place) => {
    const builder = buildThing(createThing({ url: place._url }));
    builder
      .setUrl(rdf.type, PlaceUri)
      .setStringNoLocale(hereIdUri, place.hereId)
      .setStringNoLocale(titleUri, place.title)
      .setStringNoLocale(addressUri, place.address)
      .setDecimal(latitudeUri, place.latitude)
      .setDecimal(longitudeUri, place.longitude);
    place.categories.forEach((cat) => builder.addStringNoLocale(categoryUri, cat));
    place.foodTypes.forEach((type) => builder.addStringNoLocale(foodTypeUri, type));
    return builder.build();
  },
);
