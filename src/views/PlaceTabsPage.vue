<template>
  <ion-page>
    <app-header :title="title" default-back-href="/discover" />
    <ion-content>
      <ion-tabs>
        <ion-tab-bar slot="top">
          <ion-tab-button tab="info" href="info">
            <ion-label>Overview</ion-label>
          </ion-tab-button>
          <ion-tab-button tab="reviews" href="reviews">
            <ion-label>Reviews</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
        <ion-router-outlet></ion-router-outlet>
      </ion-tabs>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import { mapGetters } from 'vuex';

import AppHeader from '@/components/common/AppHeader.vue';
import { Place } from '@/model/Place';
import { FETCH_SUGGESTED_PLACE_REVIEWER_NAMES_ACTION } from '@/store/recommend/actions';

export default defineComponent({
  components: {
    AppHeader,
    IonContent,
    IonLabel,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonPage,
    IonRouterOutlet,
  },
  async created() {
    await this.$store.dispatch(FETCH_SUGGESTED_PLACE_REVIEWER_NAMES_ACTION, this.$route.params.id);
  },
  computed: {
    place(): Place | null {
      return this.suggestedPlaceById(this.$route.params.id);
    },
    title(): string {
      return this.place?.title ?? '';
    },
    ...mapGetters(['suggestedPlaceById']),
  },
});
</script>
