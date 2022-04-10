import { getSolidDataset } from '@inrupt/solid-client';

import { FetchFn } from '@/utils/solid/FetchFn';

export async function containerExists(containerUrl: string, fetch: FetchFn): Promise<boolean> {
  try {
    await getSolidDataset(containerUrl, { fetch });
    return true;
  } catch (err) {
    return (err as { statusCode: number }).statusCode !== 404;
  }
}
