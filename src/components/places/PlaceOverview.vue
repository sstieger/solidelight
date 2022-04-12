<template>
  <template v-if="$props.place">
    <div class="ion-margin-top" v-if="$props.place.stats">
      <div><rating-stars :stars="$props.place.stats.averageRatingHalfStars" /></div>
      <div>{{ $props.place.stats.averageRatingStr }} ({{ $props.place.stats.numberOfReviewsDescription }})</div>
    </div>
    <ion-list class="list-no-padding-start">
      <ion-list-header>Categories</ion-list-header>
      <ion-item>{{ foodTypesList }}</ion-item>
      <ion-list-header>Address</ion-list-header>
      <ion-item>{{ address }}</ion-item>
      <template v-if="openingHours?.length">
        <ion-list-header>Opening Hours</ion-list-header>
        <ion-item v-for="openingHoursText in openingHours" v-bind:key="openingHoursText">
          {{ openingHoursText }}
        </ion-item>
      </template>
    </ion-list>
    <div class="ion-margin-top" v-if="openingHours?.length"></div>
  </template>
</template>

<script lang="ts">
import { IonItem, IonList, IonListHeader } from '@ionic/vue';
import { PropType, defineComponent } from '@vue/runtime-core';
import { arrowForward } from 'ionicons/icons';

import RatingStars from '@/components/ratings/RatingStars.vue';
import { SuggestedPlace } from '@/recommend/SuggestedPlace';
import { WithReviews } from '@/recommend/SuggestedPlace/WithReviews';
import { WithStatsOptional } from '@/recommend/SuggestedPlace/WithStatsOptional';
import { buildAddressStr } from '@/utils/map/buildAddressStr';
import { eatAndDrinkCategories } from '@/utils/map/eatAndDrinkCategories';
import { getSortedFoodTypeNames } from '@/utils/map/getSortedFoodTypeNames';

export default defineComponent({
  name: 'PlaceOverview',
  components: { IonItem, IonList, IonListHeader, RatingStars },
  setup() {
    return {
      arrowForward,
    };
  },
  props: {
    place: {
      type: Object as PropType<SuggestedPlace & WithReviews & WithStatsOptional>,
      required: true,
    },
  },
  computed: {
    foodTypesList(): string {
      return getSortedFoodTypeNames(this.$props.place.foodTypes).join(', ');
    },
    address(): string {
      return buildAddressStr(this.$props.place.address);
    },
    openingHours(): string[] | null {
      if (!this.$props.place.openingHours?.length) {
        return null;
      }
      const eatAndDrinkCategoryIds = Object.keys(eatAndDrinkCategories);
      return this.$props.place.openingHours
        .filter(({ categories }) => !categories || categories.some(({ id }) => eatAndDrinkCategoryIds.includes(id)))
        .map((openingHours) => {
          return {
            ...openingHours,
            categories: openingHours.categories?.filter(({ id }) => eatAndDrinkCategoryIds.includes(id)),
          };
        })
        .flatMap(({ text, categories }) => {
          if (categories) {
            return `${text} (${categories.map(({ id }) => eatAndDrinkCategories[id].name)})`;
          } else {
            return `${text}`;
          }
        });
    },
  },
});
</script>

<style scoped>
.list-no-padding-start {
  padding-top: 0;
}

.list-no-padding-start > ion-list-header {
  padding-left: 0;
}

.list-no-padding-start > ion-item {
  --padding-start: 0;
}
</style>
