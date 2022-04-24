<template>
  <IonPage>
    <AppHeader title="Settings" />
    <IonContent fullscreen>
      <SettingsList />
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';

import AppHeader from '@/components/common/AppHeader.vue';
import SettingsList from '@/components/settings/SettingsList.vue';
</script>
