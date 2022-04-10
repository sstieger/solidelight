/* eslint-disable sort-imports */

import { IonicVue } from '@ionic/vue';
import { createApp } from 'vue';

import App from '@/App.vue';
import {
  DEFAULT_PAGE_PATH,
  PATHS_EXCLUDED_FROM_BACKUP_BEFORE_AUTH_REDIRECT,
  PATH_BEFORE_AUTH_REDIRECT_STORAGE_KEY,
} from '@/constants';
import { UserProgress } from '@/model/UserProgress';
import { createRouter } from '@/router/createRouter';
import { createIonicStorage } from '@/storage/createIonicStorage';
import { createPersistentStore } from '@/store/createPersistentStore';
import {
  DETECT_CURRENT_AUTH_STATE_AND_SESSION_ACTION,
  FETCH_PREFERENCES_ACTION,
  FETCH_SOLID_PROFILE_ACTION,
  INITIAL_FETCH_ACTION,
} from '@/store/user/actions';
import { applyColorScheme } from '@/utils/app/colorScheme/applyColorScheme';
import { showErrorToast } from '@/utils/app/notify/showErrorToast';
import { silentAuth } from '@/utils/auth/silentAuth';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import '@/style/variables.css';
import '@/style/app.css';

/* Service worker (PWA) */
import '@/registerServiceWorker.ts';

const app = createApp(App);

app.use(IonicVue);

(async function () {
  const ionicStorage = createIonicStorage();
  await ionicStorage.create();

  let silentAuthError = false;
  try {
    await silentAuth(
      ionicStorage,
      PATH_BEFORE_AUTH_REDIRECT_STORAGE_KEY,
      PATHS_EXCLUDED_FROM_BACKUP_BEFORE_AUTH_REDIRECT,
      DEFAULT_PAGE_PATH,
    );
  } catch {
    await showErrorToast('Authentication failed, please check your connection.');
    silentAuthError = true;
  }

  const store = createPersistentStore(ionicStorage);
  app.use(store);

  // Wait for the initial state to be restored from the Ionic storage.
  await store.restored;

  applyColorScheme(store.state.user.colorScheme);

  if (!silentAuthError) {
    await store.dispatch(DETECT_CURRENT_AUTH_STATE_AND_SESSION_ACTION);
  }

  if (store.state.user.userProgress >= UserProgress.LOGGED_IN) {
    await store.dispatch(FETCH_SOLID_PROFILE_ACTION);
    await store.dispatch(FETCH_PREFERENCES_ACTION);
  }

  if (store.state.user.userProgress >= UserProgress.APP_CONTAINER_URL_SET) {
    store.dispatch(INITIAL_FETCH_ACTION);
  }

  const router = createRouter(store);
  app.use(router);
  await router.isReady();

  app.mount('#app');
})();
