<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start" v-if="showBackButton">
        <IonBackButton :default-href="defaultBackHref" />
      </IonButtons>
      <IonTitle>{{ title }}</IonTitle>
      <IonButtons slot="end">
        <slot name="buttons" />
        <IonButton routerLink="/settings" v-if="showSettingsButton">
          <IonIcon slot="icon-only" :icon="settings" />
        </IonButton>
      </IonButtons>
    </IonToolbar>
  </IonHeader>
</template>

<script setup lang="ts">
import { IonBackButton, IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/vue';
import { settings } from 'ionicons/icons';
import { defineProps, withDefaults } from 'vue';

import { DEFAULT_PAGE_PATH } from '@/constants';

interface Props {
  title: string;
  showBackButton?: boolean;
  defaultBackHref?: string;
  showSettingsButton?: boolean;
}
withDefaults(defineProps<Props>(), {
  showBackButton: true,
  defaultBackHref: DEFAULT_PAGE_PATH,
  showSettingsButton: false,
});
</script>
