<template>
  <ion-app>
    <loading-data v-if="needsInitialFetch && !initialFetchComplete" />
    <ion-router-outlet v-else />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet, alertController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

import LoadingData from '@/components/common/LoadingData.vue';
import { State as RootState } from '@/store/state';
import { ColorScheme } from '@/utils/app/colorScheme/ColorScheme';
import { applyColorScheme } from '@/utils/app/colorScheme/applyColorScheme';
import { prefersDarkColorSchemeMediaQueryList } from '@/utils/app/colorScheme/prefersDarkColorSchemeMediaQueryList';

import { UserProgress } from './model/UserProgress';

interface Data {
  isRefreshing: boolean;
}

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    LoadingData,
  },
  data(): Data {
    return {
      isRefreshing: false,
    };
  },
  async created() {
    this.registerServiceWorkerListener();
    this.registerPrefersDarkColorSchemeChangeListener();
  },
  computed: mapState<RootState>({
    colorScheme: (state: RootState) => state.user.colorScheme,
    needsInitialFetch: (state: RootState) => state.user.userProgress >= UserProgress.APP_CONTAINER_URL_SET,
    initialFetchComplete: (state: RootState) => state.user.initialFetchComplete,
  }),
  watch: {
    colorScheme(newColorScheme: ColorScheme) {
      applyColorScheme(newColorScheme);
    },
  },
  methods: {
    registerServiceWorkerListener(): void {
      document.addEventListener<any>('serviceWorkerUpdateAvailable', (event) => this.appUpdateAvailable(event.detail), {
        once: true,
      });
      if (navigator.serviceWorker) {
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          if (!this.isRefreshing) {
            this.isRefreshing = true;
            window.location.reload();
          }
        });
      }
    },
    registerPrefersDarkColorSchemeChangeListener(): void {
      prefersDarkColorSchemeMediaQueryList.addEventListener('change', () =>
        applyColorScheme(this.$store.state.user.colorScheme),
      );
    },
    async appUpdateAvailable(swRegistration: ServiceWorkerRegistration): Promise<void> {
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
    },
  },
});
</script>
