<template>
  <IonPage>
    <IonContent>
      <template v-if="place">
        <NoPlaceReviews v-if="!place.reviews.length" />
        <PlaceReviewsList v-else :reviews="place.reviews" />
      </template>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import NoPlaceReviews from '@/components/places/NoPlaceReviews.vue';
import PlaceReviewsList from '@/components/places/PlaceReviewsList.vue';
import { SuggestedPlace } from '@/recommend/SuggestedPlace';
import { WithReviews } from '@/recommend/SuggestedPlace/WithReviews';
import { State } from '@/store/state';

const route = useRoute();
const store = useStore<State>();

const place = computed<(SuggestedPlace & WithReviews) | null>(() => store.getters.suggestedPlaceById(route.params.id));
</script>
