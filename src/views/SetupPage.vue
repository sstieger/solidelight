<template>
  <IonPage>
    <AppHeader title="Setup" :showBackButton="false" />
    <IonContent>
      <SetupForm />
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';

import AppHeader from '@/components/common/AppHeader.vue';
import SetupForm from '@/components/setup/SetupForm.vue';
</script>
