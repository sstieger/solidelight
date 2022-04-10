<template>
  <ion-buttons slot="end">
    <ion-button @click="$emit('click', $event)">
      <ion-icon slot="icon-only" :icon="close"></ion-icon>
    </ion-button>
  </ion-buttons>
</template>

<script lang="ts">
import { IonButton, IonButtons, IonIcon } from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import { close } from 'ionicons/icons';

export default defineComponent({
  name: 'CloseModalButton',
  components: { IonButton, IonButtons, IonIcon },
  setup() {
    return { close };
  },
  emits: ['click'],
});
</script>
