<template>
  <ion-item detail button :router-link="placePageUrl">
    <div>
      <div>
        <ion-label>{{ place.title }}</ion-label>
      </div>
      <div v-if="place.reviews.length && place.stats">
        <ion-note>
          <rating-stars :stars="place.stats.averageRatingHalfStars" />&nbsp;
          {{ place.stats.averageRatingStr }}
          ({{ place.stats.numberOfReviewsDescription }})
        </ion-note>
      </div>
      <div>
        <ion-note>{{ foodTypesList }}</ion-note>
      </div>
      <div>
        <ion-note>{{ address }}</ion-note>
      </div>
      <div v-if="explainSuggestions">
        <ion-note>
          <ion-icon class="icon-note" :icon="sparkles" /> {{ scoreToRoundedPercentage(place.scores.overall) }}%
          (<ion-icon class="icon-note" :icon="restaurant" /> {{ scoreToRoundedPercentage(place.scores.tasteProfile) }}%,
          <ion-icon class="icon-note" :icon="navigate" /> {{ scoreToRoundedPercentage(place.scores.distance) }}%)
        </ion-note>
      </div>
    </div>
  </ion-item>
</template>

<script lang="ts">
import { IonIcon, IonItem, IonLabel, IonNote } from '@ionic/vue';
import { PropType, defineComponent } from '@vue/runtime-core';
import { navigate, restaurant, sparkles } from 'ionicons/icons';
import { mapState } from 'vuex';

import RatingStars from '@/components/ratings/RatingStars.vue';
import { PlaceReview } from '@/model/PlaceReview';
import { SuggestedPlaceScores } from '@/recommend/SuggestedPlace';
import { State as RootState } from '@/store/state';
import { scoreToRoundedPercentage as utilsScoreToRoundedPercentage } from '@/utils/app/transform/scoreToRoundedPercentage';
import { Place } from '@/utils/map/Place';
import { buildAddressStr } from '@/utils/map/buildAddressStr';
import { getSortedFoodTypeNames } from '@/utils/map/getSortedFoodTypeNames';

type MapPlaceWithScoreAndReviews = Place & { scores: SuggestedPlaceScores; reviews: PlaceReview[] };

export default defineComponent({
  name: 'SuggestedPlacesListItem',
  components: { IonIcon, IonLabel, IonItem, IonNote, RatingStars },
  props: {
    place: {
      type: Object as PropType<MapPlaceWithScoreAndReviews>,
      required: true,
    },
  },
  setup() {
    return {
      navigate,
      restaurant,
      sparkles,
    };
  },
  computed: {
    placePageUrl(): string {
      return `/discover/${this.$props.place.id}/info`;
    },
    foodTypesList(): string {
      return getSortedFoodTypeNames(this.$props.place.foodTypes).join(', ');
    },
    address(): string {
      return buildAddressStr(this.$props.place.address);
    },
    ...mapState<RootState>({
      explainSuggestions: (state: RootState) => state.user.explainSuggestions,
    }),
  },
  methods: {
    scoreToRoundedPercentage(score: number) {
      return utilsScoreToRoundedPercentage(score);
    },
  },
});
</script>

<style scoped>
.icon-note {
  height: 12px;
}
</style>
