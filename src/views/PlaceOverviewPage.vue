<template>
  <ion-page>
    <ion-content class="ion-padding">
      <place-overview v-if="place" :place="place" />
      <ion-fab vertical="bottom" horizontal="end">
        <ion-fab-button><ion-icon :icon="navigate" /></ion-fab-button>
        <ion-fab-list side="top">
          <ion-fab-button @click="openGoogleMaps">
            <ion-icon :icon="logoGoogle" />
          </ion-fab-button>
          <ion-fab-button @click="openAppleMaps">
            <ion-icon :icon="logoApple" />
          </ion-fab-button>
        </ion-fab-list>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonFab, IonFabButton, IonFabList, IonIcon, IonPage } from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import { logoApple, logoGoogle, navigate } from 'ionicons/icons';
import { mapGetters } from 'vuex';

import PlaceOverview from '@/components/places/PlaceOverview.vue';
import { SuggestedPlace } from '@/recommend/SuggestedPlace';
import { buildAddressStr } from '@/utils/map/buildAddressStr';
import { buildAppleMapsSearchUrl } from '@/utils/map/buildAppleMapsSearchUrl';
import { buildGoogleMapsSearchUrl } from '@/utils/map/buildGoogleMapsSearchUrl';

export default defineComponent({
  components: {
    IonContent,
    IonFab,
    IonFabButton,
    IonFabList,
    IonIcon,
    IonPage,
    PlaceOverview,
  },
  setup() {
    return { logoApple, logoGoogle, navigate };
  },
  computed: {
    mapsQueryStr(): string {
      if (!this.place) {
        return '';
      }
      const address = buildAddressStr(this.place.address);
      return `${this.place.title}, ${address}`;
    },
    title(): string {
      return this.place?.title ?? '';
    },
    place(): SuggestedPlace | null {
      return this.suggestedPlaceById(this.$route.params.id);
    },
    ...mapGetters(['suggestedPlaceById']),
  },
  methods: {
    openGoogleMaps(): void {
      window.open(buildGoogleMapsSearchUrl(this.mapsQueryStr));
    },
    openAppleMaps(): void {
      window.open(buildAppleMapsSearchUrl(this.mapsQueryStr));
    },
  },
});
</script>
