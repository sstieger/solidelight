<template>
  <ion-fab vertical="bottom" horizontal="end" slot="fixed">
    <ion-fab-button @click="$emit('click')">
      <ion-icon :icon="add"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script lang="ts">
import { IonFab, IonFabButton, IonIcon } from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import { add } from 'ionicons/icons';

export default defineComponent({
  name: 'CreateFab',
  components: { IonFab, IonFabButton, IonIcon },
  setup() {
    return {
      add,
    };
  },
  emits: ['click'],
});
</script>
