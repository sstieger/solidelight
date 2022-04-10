import {
  SolidDataset,
  ThingPersisted,
  createSolidDataset,
  deleteSolidDataset,
  getSolidDataset,
  getThing,
  saveSolidDatasetAt,
  setThing,
} from '@inrupt/solid-client';

import { Profile } from '@/model/Profile';
import { joinPathParts } from '@/utils/path/joinPathParts';
import { FetchFn } from '@/utils/solid/FetchFn';

import { profileCodec } from './codecs/profileCodec';
import { getDatasetUrl as getReviewsDatasetUrl } from './placeReviews';

export async function getProfile(
  containerUrl: string,
  defaultProfile: Profile | null,
  fetch: FetchFn,
): Promise<Profile> {
  const dataset = await getDataset(containerUrl, defaultProfile, fetch);
  const profileThing = getThing(dataset, buildThingUrl(containerUrl)) as ThingPersisted;
  const profileEither = profileCodec.decode(profileThing);
  if (profileEither._tag === 'Left') {
    throw new Error(profileEither.left.map((err) => err.message).join(', '));
  }
  return profileEither.right;
}

async function getDataset(containerUrl: string, defaultProfile: Profile | null, fetch: FetchFn): Promise<SolidDataset> {
  try {
    return await getSolidDataset(getDatasetUrl(containerUrl), { fetch });
  } catch (err) {
    if ((err as { statusCode: number }).statusCode === 404 && defaultProfile !== null) {
      return await saveProfile(defaultProfile, containerUrl, fetch);
    } else {
      throw err;
    }
  }
}

export async function saveProfile(profile: Profile, containerUrl: string, fetch: FetchFn): Promise<SolidDataset> {
  const _url = buildThingUrl(containerUrl);
  const persistentProfile = { _url, ...profile };
  const profileThing = profileCodec.encode(persistentProfile);
  const dataset = setThing(createSolidDataset(), profileThing);
  return await saveSolidDatasetAt(_url, dataset, { fetch });
}

export async function deleteDataset(containerUrl: string, fetch: FetchFn): Promise<void> {
  // const dataset = await getProfileDataset(containerUrl, null, fetch);
  // const deleteAclP = null; // hasAccessibleAcl(dataset) ? deleteAclFor(dataset, { fetch }) : null;
  await deleteSolidDataset(getDatasetUrl(containerUrl), { fetch });
}

function buildThingUrl(containerUrl: string): string {
  return `${getDatasetUrl(containerUrl)}#me`;
}

export function getDatasetUrl(containerUrl: string): string {
  return joinPathParts([containerUrl, 'profile']);
}

export function buildDefaultProfile(containerUrl: string, webId: string): Profile {
  const date = new Date();
  return {
    creator: webId,
    dateCreated: date,
    dateModified: date,
    reviews: getReviewsDatasetUrl(containerUrl),
  };
}
