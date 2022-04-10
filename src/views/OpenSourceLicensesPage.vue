<template>
  <ion-page>
    <app-header title="Open Source Licenses" />
    <ion-content fullscreen class="ion-padding">
      <div class="licenses-text">
        {{ licensesText }}
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, modalController } from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';

import AppHeader from '@/components/common/AppHeader.vue';
import { showErrorToast } from '@/utils/app/notify/showErrorToast';

let licensesTextPromise: Promise<string> | null = null;

export default defineComponent({
  components: { AppHeader, IonContent, IonPage },
  data() {
    return {
      modal: modalController,
      licensesText: '',
    };
  },
  beforeCreate() {
    if (!licensesTextPromise) {
      licensesTextPromise = fetchLicensesText();
    }
  },
  created() {
    if (licensesTextPromise) {
      licensesTextPromise
        .then((text) => (this.licensesText = text))
        .catch(() => showErrorToast('Fetching the open source licenses was not possible.'));
    }
  },
});

async function fetchLicensesText(): Promise<string> {
  const response = await fetch('/licenses.txt');
  if (response.status !== 200) {
    throw new Error('Licenses request failed');
  }
  const text = await response.text();
  return text;
}
</script>

<style scoped>
.licenses-text {
  white-space: pre-line;
}
</style>
