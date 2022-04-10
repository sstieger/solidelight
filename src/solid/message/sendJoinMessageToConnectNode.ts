import { buildThing } from '@inrupt/solid-client';
import { rdf } from 'rdf-namespaces';
import { actor } from 'rdf-namespaces/dist/as';

import { JoinMessage, object, profile } from '@/namespace/joinMessage';
import { getDatasetUrl } from '@/solid/profile';
import { FetchFn } from '@/utils/solid/FetchFn';

import { sendThingToConnectNode } from './sendThingToConnectNode';

export async function sendJoinMessageToConnectNode(containerUrl: string, webId: string, fetch: FetchFn): Promise<void> {
  const thing = buildThing()
    .setUrl(rdf.type, JoinMessage)
    .setUrl(actor, webId)
    .setStringNoLocale(object, 'Solidelight')
    .setUrl(profile, getDatasetUrl(containerUrl))
    .build();
  await sendThingToConnectNode(thing, fetch);
}
