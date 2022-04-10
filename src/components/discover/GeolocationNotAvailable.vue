<template>
  <ion-grid class="app-content-centered-vertically ion-text-center">
    <ion-row>
      <ion-col>
        <ion-icon class="large-icon" :icon="location" />
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-note>Your current location could not be detected.</ion-note>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-note>Please allow your browser and this website to access your location.</ion-note>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { IonCol, IonGrid, IonIcon, IonNote, IonRow } from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import { location } from 'ionicons/icons';

export default defineComponent({
  name: 'GeolocationNotAvailable',
  components: { IonCol, IonGrid, IonIcon, IonNote, IonRow },
  setup() {
    return { location };
  },
});
</script>
