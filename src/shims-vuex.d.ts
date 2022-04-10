import { State, StoreWithRestoredPromise } from './store/createPersistentStore';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: StoreWithRestoredPromise<State>;
  }
}
