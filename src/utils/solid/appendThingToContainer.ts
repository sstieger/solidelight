import { Thing, createSolidDataset, saveSolidDatasetInContainer, setThing } from '@inrupt/solid-client';

import { FetchFn } from '@/utils/solid/FetchFn';

export async function appendThingToContainer(thing: Thing, containerUrl: string, fetch: FetchFn): Promise<void> {
  const dataset = setThing(createSolidDataset(), thing);
  await saveSolidDatasetInContainer(containerUrl, dataset, { fetch });
}
