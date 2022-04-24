<template>
  <IonPage>
    <AppHeader title="Open Source Licenses" />
    <IonContent fullscreen class="ion-padding">
      <div class="licenses-text">
        {{ licensesText }}
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { ref } from 'vue';

import AppHeader from '@/components/common/AppHeader.vue';
import { showErrorToast } from '@/utils/app/notify/showErrorToast';

const licensesText = ref('');

const fetchLicensesText = async (): Promise<string> => {
  const response = await fetch('/licenses.txt');
  if (response.status !== 200) {
    throw new Error('Licenses request failed');
  }
  const text = await response.text();
  return text;
};

fetchLicensesText()
  .then((text) => (licensesText.value = text))
  .catch(() => showErrorToast('Fetching the open source licenses was not possible.'));
</script>

<style scoped>
.licenses-text {
  white-space: pre-line;
}
</style>
