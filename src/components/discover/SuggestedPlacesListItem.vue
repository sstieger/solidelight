<template>
  <IonItem detail button :routerLink="placePageUrl">
    <div>
      <div>
        <IonLabel>{{ place.title }}</IonLabel>
      </div>
      <div v-if="place.reviews.length && place.stats">
        <IonNote>
          <RatingStars :stars="place.stats.averageRatingHalfStars" />&nbsp;
          {{ place.stats.averageRatingStr }}
          ({{ place.stats.numberOfReviewsDescription }})
        </IonNote>
      </div>
      <div>
        <IonNote>{{ foodTypesList }}</IonNote>
      </div>
      <div>
        <IonNote>{{ address }}</IonNote>
      </div>
      <div v-if="explainSuggestions">
        <IonNote>
          <IonIcon class="icon-note" :icon="sparkles" /> {{ scoreToRoundedPercentage(place.scores.overall) }}% (<IonIcon
            class="icon-note"
            :icon="restaurant"
          />
          {{ scoreToRoundedPercentage(place.scores.tasteProfile) }}%, <IonIcon class="icon-note" :icon="navigate" />
          {{ scoreToRoundedPercentage(place.scores.distance) }}%)
        </IonNote>
      </div>
    </div>
  </IonItem>
</template>

<script setup lang="ts">
import { IonIcon, IonItem, IonLabel, IonNote } from '@ionic/vue';
import { navigate, restaurant, sparkles } from 'ionicons/icons';
import { computed, defineProps } from 'vue';
import { useStore } from 'vuex';

import RatingStars from '@/components/ratings/RatingStars.vue';
import { PlaceReview } from '@/model/PlaceReview';
import { SuggestedPlaceScores } from '@/recommend/SuggestedPlace';
import { State } from '@/store/state';
import { scoreToRoundedPercentage } from '@/utils/app/transform/scoreToRoundedPercentage';
import { Place } from '@/utils/map/Place';
import { buildAddressStr } from '@/utils/map/buildAddressStr';
import { getSortedFoodTypeNames } from '@/utils/map/getSortedFoodTypeNames';

const store = useStore<State>();

type MapPlaceWithScoreAndReviews = Place & { scores: SuggestedPlaceScores; reviews: PlaceReview[] };
interface Props {
  place: MapPlaceWithScoreAndReviews;
}
const props = defineProps<Props>();

const placePageUrl = computed(() => `/discover/${props.place.id}/info`);
const foodTypesList = computed(() => getSortedFoodTypeNames(props.place.foodTypes).join(', '));
const address = computed(() => buildAddressStr(props.place.address));
const explainSuggestions = computed(() => store.state.user.explainSuggestions);
</script>

<style scoped>
.icon-note {
  height: 12px;
}
</style>
