<template>
  <div class="ion-text-center small-padding-vertical">
    <IonNote v-if="lastUpdated">Last updated: {{ lastUpdated }}</IonNote>
  </div>
  <IonList class="padded-items-list">
    <SuggestedPlacesListItem v-for="place in suggestedPlaces" v-bind:key="place.id" :place="place" />
  </IonList>
</template>

<script setup lang="ts">
import { IonList, IonNote } from '@ionic/vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

import { State } from '@/store/state';
import { getLocalDateStr } from '@/utils/date/getLocalDateStr';

import SuggestedPlacesListItem from './SuggestedPlacesListItem.vue';

const store = useStore<State>();

const lastUpdated = computed<string | null>(() => {
  const timestamp = store.state.recommend.suggestedPlacesMetaInfo?.geolocationTimestamp;
  return timestamp ? getLocalDateStr(new Date(timestamp)) : null;
});
const suggestedPlaces = computed(() => store.state.recommend.suggestedPlaces);
</script>
