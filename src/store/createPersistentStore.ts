import { Storage } from '@ionic/storage';
import { Store, createStore as vuexCreateStore } from 'vuex';

import { createIonicStorageVuexPersist } from '@/utils/app/persist/createIonicStorageVuexPersist';

import { recommendModule } from './recommend/recommendModule';
import { PersistentState, State, reduceStateToPersistentState } from './state';
import { userModule } from './user/userModule';

export type StoreWithRestoredPromise = Store<State> & { restored: Promise<void> };

export function createPersistentStore(ionicStorage: Storage): StoreWithRestoredPromise {
  const persistence = createIonicStorageVuexPersist<State, PersistentState>(ionicStorage, 'state', (state) =>
    reduceStateToPersistentState(state),
  );
  return vuexCreateStore<State>({
    plugins: [persistence.plugin],
    modules: {
      user: userModule,
      recommend: recommendModule,
    },
  }) as StoreWithRestoredPromise;
}
