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
import { Place } from '@/model/Place';
import { joinPathParts } from '@/utils/path/joinPathParts';
import { FetchFn } from '@/utils/solid/FetchFn';
import { generateUuid } from '@/utils/uuid/generateUuid';

import { placeCodec } from './codecs/placeCodec';

export async function getPlaces(containerUrl: string, fetch: FetchFn): Promise<PersistentPlace[]> {
  const dataset = await getDataset(containerUrl, fetch);
  const things = getThingAll(dataset);
  return things.map((thing) => buildPlaceFromThing(thing)).filter((place): place is PersistentPlace => place !== null);
}

export async function addPlace(place: Place, containerUrl: string, fetch: FetchFn): Promise<PersistentPlace> {
  const id = generateUuid();
  const _url = buildThingUrl(id, containerUrl);
  const persistentPlace: PersistentPlace = { ...place, id, _url };
  const thing = placeCodec.encode(persistentPlace);
  const updatedDataset = setThing(await getDataset(containerUrl, fetch), thing);
  await updateDataset(updatedDataset, containerUrl, fetch);
  return persistentPlace;
}

function buildPlaceFromThing(thing: ThingPersisted): PersistentPlace | null {
  const decoded = placeCodec.decode(thing);
  return decoded._tag === 'Right' ? decoded.right : null;
}

export async function updatePlace(place: PersistentPlace, containerUrl: string, fetch: FetchFn): Promise<SolidDataset> {
  const thing = placeCodec.encode(place);
  const updatedDataset = setThing(await getDataset(containerUrl, fetch), thing);
  return await updateDataset(updatedDataset, containerUrl, fetch);
}

export async function deletePlace(placeId: string, containerUrl: string, fetch: FetchFn): Promise<SolidDataset> {
  const updatedDataset = removeThing(await getDataset(containerUrl, fetch), buildThingUrl(placeId, containerUrl));
  return await updateDataset(updatedDataset, containerUrl, fetch);
}

async function getDataset(containerUrl: string, fetch: FetchFn): Promise<SolidDataset> {
  try {
    return await getSolidDataset(getDatasetUrl(containerUrl), { fetch });
  } catch (err) {
    if ((err as { statusCode: number }).statusCode === 404) {
      const dataset = createSolidDataset();
      await updateDataset(dataset, containerUrl, fetch);
      return dataset;
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

export function buildThingUrl(placeId: string, containerUrl: string): string {
  return `${getDatasetUrl(containerUrl)}#${placeId}`;
}

export function getDatasetUrl(containerUrl: string): string {
  return joinPathParts([containerUrl, 'places']);
}
