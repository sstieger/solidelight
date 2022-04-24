<template>
  <IonPage>
    <AppHeader title="Taste Profile" :showBackButton="false" showSettingsButton>
      <template v-slot:buttons>
        <IonButton routerLink="/tasteProfileHelp">
          <IonIcon slot="icon-only" :icon="help" />
        </IonButton>
      </template>
    </AppHeader>
    <IonContent fullscreen>
      <NoTasteProfile v-if="tasteProfileIsEmpty" />
      <template v-else>
        <BaseTypesList />
        <VariationTypesList />
      </template>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/vue';
import { help } from 'ionicons/icons';
import { computed } from 'vue';
import { useStore } from 'vuex';

import AppHeader from '@/components/common/AppHeader.vue';
import BaseTypesList from '@/components/tasteProfile/BaseTypesList.vue';
import NoTasteProfile from '@/components/tasteProfile/NoTasteProfile.vue';
import VariationTypesList from '@/components/tasteProfile/VariationTypesList.vue';
import { State as RootState } from '@/store/state';

const store = useStore<RootState>();

const tasteProfileIsEmpty = computed(() => {
  const profile = store.state.recommend.tasteProfile;
  return !profile || (!Object.keys(profile.baseTypes).length && !Object.keys(profile.variationTypes).length);
});
</script>
