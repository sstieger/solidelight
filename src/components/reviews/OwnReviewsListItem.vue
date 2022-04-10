<template>
  <ion-item detail button :router-link="reviewPageUrl">
    <div>
      <div>
        <ion-note>{{ lastModifiedDateLocalStr }}</ion-note>
      </div>
      <div><rating-stars :stars="review.rating" /></div>
      <div>
        <ion-label>{{ review.place.title }}</ion-label>
      </div>
      <div>
        <ion-note>{{ review.place.address }}</ion-note>
      </div>
      <div class="review" v-if="review.review">
        <ion-note>{{ review.review }}</ion-note>
      </div>
    </div>
  </ion-item>
</template>

<script lang="ts">
import { IonItem, IonLabel, IonNote } from '@ionic/vue';
import { PropType, defineComponent } from '@vue/runtime-core';

import RatingStars from '@/components/ratings/RatingStars.vue';
import { PersistentPlaceReview } from '@/model/PersistentPlaceReview';
import { getLocalDateStr } from '@/utils/date/getLocalDateStr';

export default defineComponent({
  name: 'ReviewsListItem',
  components: { IonItem, IonLabel, IonNote, RatingStars },
  props: {
    review: {
      type: Object as PropType<PersistentPlaceReview>,
      required: true,
    },
  },
  computed: {
    lastModifiedDateLocalStr(): string {
      return getLocalDateStr(this.review.dateModified);
    },
    reviewPageUrl(): string {
      return `/myReviews/${this.review.id}`;
    },
  },
});
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
