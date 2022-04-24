<template>
  <IonPage>
    <AppHeader title="Discover" :showBackButton="false" showSettingsButton>
      <template v-slot:buttons>
        <IonButton @click="refreshSuggestions">
          <IonIcon slot="icon-only" :icon="refresh" />
        </IonButton>
      </template>
    </AppHeader>
    <IonContent fullscreen>
      <IonRefresher slot="fixed" @ionRefresh="pullRefresh">
        <IonRefresherContent />
      </IonRefresher>
      <GeolocationNotAvailable v-if="!geolocationAvailable" />
      <template v-else>
        <SuggestionsLoading v-if="isGeneratingSuggestions" />
        <template v-else>
          <NoSuggestions v-if="!suggestedPlaces.length" />
          <SuggestedPlacesList v-else />
        </template>
      </template>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonContent,
  IonIcon,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  RefresherCustomEvent,
  onIonViewWillEnter,
} from '@ionic/vue';
import { refresh } from 'ionicons/icons';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

import AppHeader from '@/components/common/AppHeader.vue';
import GeolocationNotAvailable from '@/components/discover/GeolocationNotAvailable.vue';
import NoSuggestions from '@/components/discover/NoSuggestions.vue';
import SuggestedPlacesList from '@/components/discover/SuggestedPlacesList.vue';
import SuggestionsLoading from '@/components/discover/SuggestionsLoading.vue';
import { SUGGEST_PLACES_ACTION } from '@/store/recommend/actions';
import { State as RootState } from '@/store/state';
import { GEOLOCATE_ACTION } from '@/store/user/actions';
import { showErrorToast } from '@/utils/app/notify/showErrorToast';

const store = useStore<RootState>();

onIonViewWillEnter(async () => {
  await refreshSuggestionsIfNoSuggestionsOrTasteProfileChanged();
});

const pullRefresh = async (event: RefresherCustomEvent): Promise<void> => {
  await refreshSuggestions();
  event.target.complete();
};
const refreshSuggestionsIfNoSuggestionsOrTasteProfileChanged = async (): Promise<void> => {
  if (!suggestedPlaces.value.length || suggestionsOutdated.value) {
    await refreshSuggestions();
  }
};
const refreshSuggestions = async (): Promise<void> => {
  try {
    isGeneratingSuggestions.value = true;
    await store.dispatch(GEOLOCATE_ACTION);
    await store.dispatch(SUGGEST_PLACES_ACTION);
  } catch (err) {
    await showErrorToast('Finding suggestions failed, please try again later.');
  } finally {
    isGeneratingSuggestions.value = false;
  }
};

const isGeneratingSuggestions = ref(false);

const suggestionsOutdated = computed(
  () =>
    !!store.state.recommend.suggestedPlacesMetaInfo &&
    !!store.state.recommend.tasteProfile &&
    store.state.recommend.tasteProfile.createdAt > store.state.recommend.suggestedPlacesMetaInfo.tasteProfileTimestamp,
);
const geolocationAvailable = computed(() => store.state.user.geolocationAvailable);
const suggestedPlaces = computed(() => store.state.recommend.suggestedPlaces);
</script>
