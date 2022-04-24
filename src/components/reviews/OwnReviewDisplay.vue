<template>
  <template v-if="props.review">
    <div>
      <IonNote>Created: {{ localDateCreatedStr }}</IonNote>
    </div>
    <div v-if="hasBeenModified">
      <IonNote>Modified: {{ localDateModifiedStr }}</IonNote>
    </div>
    <div class="rating-stars-container ion-margin-vertical">
      <RatingStars :stars="review.rating" />
    </div>
    <div class="ion-margin-vertical">
      <h3>{{ review.place.title }}</h3>
      <IonNote>{{ review.place.address }}</IonNote>
    </div>
    <p class="review" v-if="review.review">{{ review.review }}</p>
  </template>
</template>

<script setup lang="ts">
import { IonNote } from '@ionic/vue';
import { computed, defineProps } from 'vue';

import RatingStars from '@/components/ratings/RatingStars.vue';
import { PersistentPlaceReviewWithPlace } from '@/model/PersistentPlaceReviewWithPersistentPlace';
import { getLocalDateStr } from '@/utils/date/getLocalDateStr';
import { parseDateStr } from '@/utils/date/parseDateStr';

interface Props {
  review: PersistentPlaceReviewWithPlace;
}
const props = defineProps<Props>();

const hasBeenModified = computed(
  () => parseDateStr(props.review.dateCreated).getTime() !== parseDateStr(props.review.dateModified).getTime(),
);
const localDateCreatedStr = computed(() => getLocalDateStr(props.review.dateCreated));
const localDateModifiedStr = computed(() => getLocalDateStr(props.review.dateModified));
</script>

<style scoped>
.rating-stars-container {
  font-size: 24px;
}
.review {
  white-space: pre-wrap;
}
</style>
