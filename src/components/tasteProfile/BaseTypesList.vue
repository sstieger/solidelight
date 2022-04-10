<template>
  <IonList v-if="annotatedProfileTypes?.length">
    <IonListHeader>Base Types</IonListHeader>
    <IonItem v-for="type in annotatedProfileTypes" v-bind:key="type.id">
      <IonLabel>{{ type.name }}</IonLabel>
      <div>{{ type.weightPercent }}%</div>
    </IonItem>
  </IonList>
</template>

<script setup lang="ts">
import { IonItem, IonLabel, IonList, IonListHeader } from '@ionic/vue';
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';

import { State } from '@/store/state';
import { scoreToRoundedPercentage } from '@/utils/app/transform/scoreToRoundedPercentage';
import { variationFoodTypes } from '@/utils/map/variationFoodTypes';
import { sortArrayByNumberFieldDesc } from '@/utils/sort/sortArrayByNumberFieldDesc';

const store = useStore<State>();

const annotatedProfileTypes = computed(() => {
  const profile = store.state.recommend.tasteProfile;
  if (!profile) {
    return null;
  }
  const typeIds: string[] = Object.keys(profile.baseTypes);
  const types = typeIds.map((id) => {
    const effectiveId = id.startsWith('800-') ? id : `${id}-000`;
    const type = variationFoodTypes[effectiveId];
    return {
      id: id,
      weightPercent: scoreToRoundedPercentage(profile.baseTypes[id].weight),
      name: type?.name ?? id,
    };
  });
  return sortArrayByNumberFieldDesc(types, ({ weightPercent }) => weightPercent);
});
</script>
