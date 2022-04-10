import { ThingPersisted, getSolidDataset, getStringNoLocale, getThing, getUrl, getUrlAll } from '@inrupt/solid-client';
import { foaf, ldp, space, vcard } from 'rdf-namespaces';

import { SolidProfile } from '@/utils/solid/SolidProfile';

import { FetchFn } from './FetchFn';

export async function getSolidProfile(webId: string, fetch: FetchFn): Promise<SolidProfile> {
  const dataset = await getSolidDataset(webId, { fetch });
  const profile: ThingPersisted = getThing(dataset, webId) as ThingPersisted;
  return {
    webId,
    avatar: getUrl(profile, vcard.hasPhoto),
    name: getStringNoLocale(profile, foaf.name) || getStringNoLocale(profile, vcard.fn),
    nickname: getStringNoLocale(profile, vcard.nickname) || getStringNoLocale(profile, foaf.nick),
    inbox: getUrl(profile, ldp.inbox),
    preferencesFile: getUrl(profile, space.preferencesFile),
    pods: getUrlAll(profile, space.storage) || [],
  };
}
