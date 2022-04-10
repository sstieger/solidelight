<template>
  <ion-grid class="app-content-centered-vertically ion-text-center">
    <ion-row>
      <ion-col>
        <ion-icon class="large-icon" :icon="search" />
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-note>Finding suggestions for you ...</ion-note>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { IonCol, IonGrid, IonIcon, IonNote, IonRow } from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import { search } from 'ionicons/icons';

export default defineComponent({
  name: 'SuggestionsLoading',
  components: { IonCol, IonGrid, IonIcon, IonNote, IonRow },
  setup() {
    return { search };
  },
});
</script>
