<template>
  <IonPage>
    <IonContent class="ion-padding">
      <PlaceOverview v-if="place" :place="place" />
      <IonFab vertical="bottom" horizontal="end">
        <IonFabButton><IonIcon :icon="navigate" /></IonFabButton>
        <IonFabList side="top">
          <IonFabButton @click="openGoogleMaps">
            <IonIcon :icon="logoGoogle" />
          </IonFabButton>
          <IonFabButton @click="openAppleMaps">
            <IonIcon :icon="logoApple" />
          </IonFabButton>
        </IonFabList>
      </IonFab>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { IonContent, IonFab, IonFabButton, IonFabList, IonIcon, IonPage } from '@ionic/vue';
import { logoApple, logoGoogle, navigate } from 'ionicons/icons';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import PlaceOverview from '@/components/places/PlaceOverview.vue';
import { SuggestedPlace } from '@/recommend/SuggestedPlace';
import { WithReviews } from '@/recommend/SuggestedPlace/WithReviews';
import { State } from '@/store/state';
import { buildAddressStr } from '@/utils/map/buildAddressStr';
import { buildAppleMapsSearchUrl } from '@/utils/map/buildAppleMapsSearchUrl';
import { buildGoogleMapsSearchUrl } from '@/utils/map/buildGoogleMapsSearchUrl';

const route = useRoute();
const store = useStore<State>();

const mapsQueryStr = computed(() =>
  place.value ? `${place.value.title}, ${buildAddressStr(place.value.address)}` : '',
);
const place = computed<(SuggestedPlace & WithReviews) | null>(() => store.getters.suggestedPlaceById(route.params.id));

const openGoogleMaps = (): void => {
  window.open(buildGoogleMapsSearchUrl(mapsQueryStr.value));
};
const openAppleMaps = (): void => {
  window.open(buildAppleMapsSearchUrl(mapsQueryStr.value));
};
</script>
