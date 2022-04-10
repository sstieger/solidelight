<template>
  <ion-grid class="app-content-centered-vertically ion-text-center">
    <ion-row>
      <ion-col>
        <ion-icon class="large-icon" :icon="sync" />
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-note>Loading Solidelight ...</ion-note>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { IonCol, IonGrid, IonIcon, IonNote, IonRow } from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import { sync } from 'ionicons/icons';

export default defineComponent({
  name: 'LoadingData',
  components: { IonCol, IonGrid, IonIcon, IonNote, IonRow },
  setup() {
    return { sync };
  },
});
</script>
