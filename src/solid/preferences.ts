import {
  SolidDataset,
  ThingPersisted,
  createThing,
  getSolidDataset,
  getThing,
  getUrl,
  removeAll,
  saveSolidDatasetAt,
  setThing,
  setUrl,
} from '@inrupt/solid-client';

import { Preferences } from '@/model/Preferences';
import { profile as profileUri } from '@/namespace/preferences';
import { FetchFn } from '@/utils/solid/FetchFn';

interface DatasetWithProfileThing {
  dataset: SolidDataset;
  profileThing: ThingPersisted | null;
}

export async function getPreferences(preferencesFileUrl: string, webId: string, fetch: FetchFn): Promise<Preferences> {
  const { profileThing } = await getDatasetWithProfileThing(preferencesFileUrl, webId, fetch);
  return { profile: profileThing ? getUrl(profileThing, profileUri) : null };
}

export async function updatePreferences(
  preferences: Preferences,
  preferencesFileUrl: string,
  webId: string,
  fetch: FetchFn,
): Promise<void> {
  if (!preferences.profile) {
    throw new Error('An update for the preferences must contain the profile URL');
  }
  const { dataset, profileThing: existingProfileThing } = await getDatasetWithProfileThing(
    preferencesFileUrl,
    webId,
    fetch,
  );
  const profileThing: ThingPersisted = existingProfileThing ?? createThing({ url: webId });
  const updatedProfileThing = setUrl(profileThing, profileUri, preferences.profile);
  const updatedDataset = setThing(dataset, updatedProfileThing);
  await saveSolidDatasetAt(preferencesFileUrl, updatedDataset, { fetch });
}

export async function deletePreferences(preferencesFileUrl: string, webId: string, fetch: FetchFn): Promise<void> {
  const { dataset, profileThing } = await getDatasetWithProfileThing(preferencesFileUrl, webId, fetch);
  if (profileThing) {
    const updatedProfileThing = removeAll(profileThing, profileUri);
    const updatedDataset = setThing(dataset, updatedProfileThing);
    await saveSolidDatasetAt(preferencesFileUrl, updatedDataset, { fetch });
  }
}

async function getDatasetWithProfileThing(
  preferencesFileUrl: string,
  webId: string,
  fetch: FetchFn,
): Promise<DatasetWithProfileThing> {
  const dataset = await getSolidDataset(preferencesFileUrl, { fetch });
  const profileThing = getThing(dataset, webId);
  return { dataset, profileThing };
}
