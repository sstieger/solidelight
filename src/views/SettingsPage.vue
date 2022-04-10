<template>
  <ion-page>
    <app-header title="Settings" />
    <ion-content fullscreen>
      <settings-list />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';

import AppHeader from '@/components/common/AppHeader.vue';
import SettingsList from '@/components/settings/SettingsList.vue';

export default defineComponent({
  components: { AppHeader, IonContent, IonPage, SettingsList },
});
</script>
