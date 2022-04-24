<template>
  <IonApp>
    <LoadingData v-if="needsInitialFetch && !initialFetchComplete" />
    <IonRouterOutlet v-else />
  </IonApp>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet, alertController } from '@ionic/vue';
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';

import LoadingData from '@/components/common/LoadingData.vue';
import { applyColorScheme } from '@/utils/app/colorScheme/applyColorScheme';
import { prefersDarkColorSchemeMediaQueryList } from '@/utils/app/colorScheme/prefersDarkColorSchemeMediaQueryList';

import { UserProgress } from './model/UserProgress';

const store = useStore();

const isRefreshing = ref(false);

const colorScheme = computed(() => store.state.user.colorScheme);
const needsInitialFetch = computed(() => store.state.user.userProgress >= UserProgress.APP_CONTAINER_URL_SET);
const initialFetchComplete = computed(() => store.state.user.initialFetchComplete);

watch(colorScheme, (cs) => applyColorScheme(cs));

const registerServiceWorkerListener = (): void => {
  document.addEventListener<any>('serviceWorkerUpdateAvailable', (event) => showAppUpdateAvailablePopup(event.detail), {
    once: true,
  });
  if (navigator.serviceWorker) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!isRefreshing.value) {
        isRefreshing.value = true;
        window.location.reload();
      }
    });
  }
};
const registerPrefersDarkColorSchemeChangeListener = (): void => {
  prefersDarkColorSchemeMediaQueryList.addEventListener('change', () => applyColorScheme(store.state.user.colorScheme));
};
const showAppUpdateAvailablePopup = async (swRegistration: ServiceWorkerRegistration): Promise<void> => {
  const alert = await alertController.create({
    header: 'Update available',
    message: 'A new version of the app is available.<br>Would you like to update now?',
    buttons: [
      { text: 'No', role: 'cancel' },
      {
        text: 'Yes',
        handler: () => {
          if (swRegistration && swRegistration.waiting) {
            swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
          }
        },
      },
    ],
  });
  await alert.present();
};

registerServiceWorkerListener();
registerPrefersDarkColorSchemeChangeListener();
</script>
