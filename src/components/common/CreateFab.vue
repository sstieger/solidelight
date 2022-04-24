<template>
  <IonFab vertical="bottom" horizontal="end" slot="fixed">
    <IonFabButton @click="$emit('click', $event)">
      <IonIcon :icon="add" />
    </IonFabButton>
  </IonFab>
</template>

<script setup lang="ts">
import { IonFab, IonFabButton, IonIcon } from '@ionic/vue';
import { add } from 'ionicons/icons';
import { defineEmits } from 'vue';

defineEmits<{
  (e: 'click', event: any): void;
}>();
</script>
