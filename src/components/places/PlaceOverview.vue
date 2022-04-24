<template>
  <template v-if="props.place">
    <div class="ion-margin-top" v-if="props.place.stats">
      <div><RatingStars :stars="props.place.stats.averageRatingHalfStars" /></div>
      <div>{{ props.place.stats.averageRatingStr }} ({{ props.place.stats.numberOfReviewsDescription }})</div>
    </div>
    <IonList class="list-no-padding-start">
      <IonListHeader>Categories</IonListHeader>
      <IonItem>{{ foodTypesList }}</IonItem>
      <IonListHeader>Address</IonListHeader>
      <IonItem>{{ address }}</IonItem>
      <template v-if="openingHours?.length">
        <IonListHeader>Opening Hours</IonListHeader>
        <IonItem v-for="openingHoursText in openingHours" v-bind:key="openingHoursText">
          {{ openingHoursText }}
        </IonItem>
      </template>
    </IonList>
  </template>
</template>

<script setup lang="ts">
import { IonItem, IonList, IonListHeader } from '@ionic/vue';
import { computed, defineProps } from 'vue';

import RatingStars from '@/components/ratings/RatingStars.vue';
import { SuggestedPlace } from '@/recommend/SuggestedPlace';
import { WithReviews } from '@/recommend/SuggestedPlace/WithReviews';
import { WithStatsOptional } from '@/recommend/SuggestedPlace/WithStatsOptional';
import { buildAddressStr } from '@/utils/map/buildAddressStr';
import { eatAndDrinkCategories } from '@/utils/map/eatAndDrinkCategories';
import { getSortedFoodTypeNames } from '@/utils/map/getSortedFoodTypeNames';

interface Props {
  place: SuggestedPlace & WithReviews & WithStatsOptional;
}
const props = defineProps<Props>();

const foodTypesList = computed(() => getSortedFoodTypeNames(props.place.foodTypes).join(', '));
const address = computed(() => buildAddressStr(props.place.address));
const openingHours = computed<string[] | null>(() => {
  if (!props.place.openingHours?.length) {
    return null;
  }
  const eatAndDrinkCategoryIds = Object.keys(eatAndDrinkCategories);
  return props.place.openingHours
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
