import { Thing } from '@inrupt/solid-client';

import config from '@/config';
import { FetchFn } from '@/utils/solid/FetchFn';
import { appendThingToContainer } from '@/utils/solid/appendThingToContainer';

export async function sendThingToConnectNode(thing: Thing, fetch: FetchFn): Promise<void> {
  await appendThingToContainer(thing, config.defaultConnectNodeInboxUrl, fetch);
}
