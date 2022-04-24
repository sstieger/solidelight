<template>
  <IonButtons slot="end">
    <IonButton @click="$emit('click', $event)">
      <IonIcon slot="icon-only" :icon="close" />
    </IonButton>
  </IonButtons>
</template>

<script setup lang="ts">
import { IonButton, IonButtons, IonIcon } from '@ionic/vue';
import { close } from 'ionicons/icons';
import { defineEmits } from 'vue';

defineEmits<{
  (e: 'click', event: any): void;
}>();
</script>
