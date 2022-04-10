<template>
  <div class="ion-text-center small-padding-vertical">
    <ion-note v-if="lastUpdated">Last updated: {{ lastUpdated }}</ion-note>
  </div>
  <ion-list class="padded-items-list">
    <suggested-places-list-item v-for="place in suggestedPlaces" v-bind:key="place.id" :place="place" />
  </ion-list>
</template>

<script lang="ts">
import { IonList, IonNote } from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import { mapState } from 'vuex';

import { State } from '@/store/state';
import { getLocalDateStr } from '@/utils/date/getLocalDateStr';

import SuggestedPlacesListItem from './SuggestedPlacesListItem.vue';

export default defineComponent({
  name: 'SuggestedPlacesList',
  components: { IonList, IonNote, SuggestedPlacesListItem },
  computed: mapState<State>({
    lastUpdated: (state: State): string | null => {
      const timestamp = state.recommend.suggestedPlacesMetaInfo?.geolocationTimestamp;
      return timestamp ? getLocalDateStr(new Date(timestamp)) : null;
    },
    suggestedPlaces: (state: State) => state.recommend.suggestedPlaces,
  }),
});
</script>
