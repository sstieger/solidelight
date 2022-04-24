<template>
  <IonItem detail button :routerLink="reviewPageUrl">
    <div>
      <div>
        <IonNote>{{ lastModifiedDateLocalStr }}</IonNote>
      </div>
      <div><RatingStars :stars="review.rating" /></div>
      <div>
        <IonLabel>{{ review.place.title }}</IonLabel>
      </div>
      <div>
        <IonNote>{{ review.place.address }}</IonNote>
      </div>
      <div class="review" v-if="review.review">
        <IonNote>{{ review.review }}</IonNote>
      </div>
    </div>
  </IonItem>
</template>

<script setup lang="ts">
import { IonItem, IonLabel, IonNote } from '@ionic/vue';
import { computed, defineProps } from 'vue';

import RatingStars from '@/components/ratings/RatingStars.vue';
import { PersistentPlaceReviewWithPlace } from '@/model/PersistentPlaceReviewWithPersistentPlace';
import { getLocalDateStr } from '@/utils/date/getLocalDateStr';

interface Props {
  review: PersistentPlaceReviewWithPlace;
}
const props = defineProps<Props>();

const lastModifiedDateLocalStr = computed(() => getLocalDateStr(props.review.dateModified));
const reviewPageUrl = computed(() => `/myReviews/${props.review.id}`);
</script>

<style scoped>
.review {
  white-space: pre-wrap;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
