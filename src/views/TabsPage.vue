<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="discover" href="/discover">
          <ion-icon :icon="search" />
          <ion-label>Discover</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="myReviews" href="/myReviews">
          <ion-icon :icon="starHalf" />
          <ion-label>My Reviews</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tasteProfile" href="/tasteProfile">
          <ion-icon :icon="person" />
          <ion-label>Taste Profile</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import { person, personCircle, search, starHalf } from 'ionicons/icons';

export default defineComponent({
  components: {
    IonLabel,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonPage,
    IonRouterOutlet,
  },
  setup() {
    return {
      person,
      personCircle,
      starHalf,
      search,
    };
  },
});
</script>
