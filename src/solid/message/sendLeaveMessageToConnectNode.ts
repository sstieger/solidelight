import { buildThing } from '@inrupt/solid-client';
import { rdf } from 'rdf-namespaces';

import { LeaveMessage, actor, object, profile } from '@/namespace/leaveMessage';
import { getDatasetUrl } from '@/solid/profile';
import { FetchFn } from '@/utils/solid/FetchFn';

import { sendThingToConnectNode } from './sendThingToConnectNode';

export async function sendLeaveMessageToConnectNode(
  containerUrl: string,
  webId: string,
  fetch: FetchFn,
): Promise<void> {
  const thing = buildThing()
    .setUrl(rdf.type, LeaveMessage)
    .setUrl(actor, webId)
    .setStringNoLocale(object, 'Solidelight')
    .setUrl(profile, getDatasetUrl(containerUrl))
    .build();
  await sendThingToConnectNode(thing, fetch);
}
