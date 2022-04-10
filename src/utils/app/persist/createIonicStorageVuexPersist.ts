import { Storage } from '@ionic/storage';
import { VuexPersistence } from 'vuex-persist';

export function createIonicStorageVuexPersist<S, R>(
  ionicStorage: Storage,
  key: string,
  reducer: (state: S) => R,
): VuexPersistence<S> {
  return new VuexPersistence<S>({
    asyncStorage: true,
    storage: {
      length: () => ionicStorage.length(),
      key: async (index) => (await ionicStorage.keys())[index],
      clear: () => ionicStorage.clear(),
      getItem: (key: string) => ionicStorage.get(key),
      setItem: async <T>(key: string, val: T) => {
        await ionicStorage.set(key, val);
        return val;
      },
      removeItem: (key) => ionicStorage.remove(key),
    },
    reducer,
    key,
  });
}
