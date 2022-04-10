<template>
  <ion-grid class="app-content-centered-vertically ion-text-center">
    <ion-row>
      <ion-col>
        <ion-icon class="large-icon" :icon="glasses" />
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-note>Nothing here yet.</ion-note>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-note>Go ahead, add some reviews!</ion-note>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { IonCol, IonGrid, IonIcon, IonNote, IonRow } from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import { glasses } from 'ionicons/icons';

export default defineComponent({
  name: 'NoReviews',
  components: { IonCol, IonGrid, IonIcon, IonNote, IonRow },
  setup() {
    return { glasses };
  },
});
</script>
