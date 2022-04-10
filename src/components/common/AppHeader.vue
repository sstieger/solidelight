<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start" v-if="showBackButton">
        <ion-back-button :default-href="defaultBackHref"></ion-back-button>
      </ion-buttons>
      <ion-title>{{ title }}</ion-title>
      <ion-buttons slot="end">
        <slot name="buttons" />
        <ion-button router-link="/settings" v-if="showSettingsButton">
          <ion-icon slot="icon-only" :icon="settings"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts">
import { IonBackButton, IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import { settings } from 'ionicons/icons';

import { DEFAULT_PAGE_PATH } from '@/constants';

export default defineComponent({
  name: 'AppHeader',
  components: { IonBackButton, IonButton, IonButtons, IonHeader, IonIcon, IonToolbar, IonTitle },
  emits: ['save'],
  setup() {
    return {
      settings,
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    showBackButton: {
      type: Boolean,
      required: false,
      default: true,
    },
    defaultBackHref: {
      type: String,
      required: false,
      default: DEFAULT_PAGE_PATH,
    },
    showSettingsButton: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
});
</script>
