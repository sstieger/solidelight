<template>
  <ion-page>
    <app-header title="Setup" :show-back-button="false" />
    <ion-content>
      <setup-form />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';

import AppHeader from '@/components/common/AppHeader.vue';
import SetupForm from '@/components/setup/SetupForm.vue';

export default defineComponent({
  components: { AppHeader, IonContent, IonPage, SetupForm },
});
</script>
