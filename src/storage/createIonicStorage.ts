import { Storage } from '@ionic/storage';

import { PERSISTENT_APP_STORE_NAME } from '@/constants';

export function createIonicStorage(): Storage {
  return new Storage({ storeName: PERSISTENT_APP_STORE_NAME });
}
