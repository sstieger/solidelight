<template>
  <template v-if="$props.review">
    <div>
      <ion-note>Created: {{ localDateCreatedStr }}</ion-note>
    </div>
    <div v-if="hasBeenModified">
      <ion-note>Modified: {{ localDateModifiedStr }}</ion-note>
    </div>
    <div class="rating-stars-container ion-margin-vertical">
      <rating-stars :stars="review.rating" />
    </div>
    <div class="ion-margin-vertical">
      <h3>{{ review.place.title }}</h3>
      <ion-note>{{ review.place.address }}</ion-note>
    </div>
    <p class="review" v-if="review.review">{{ review.review }}</p>
  </template>
</template>

<script lang="ts">
import { IonNote } from '@ionic/vue';
import { PropType, defineComponent } from '@vue/runtime-core';
import { arrowForward } from 'ionicons/icons';

import RatingStars from '@/components/ratings/RatingStars.vue';
import { PlaceReview } from '@/model/PlaceReview';
import { getLocalDateStr } from '@/utils/date/getLocalDateStr';
import { parseDateStr } from '@/utils/date/parseDateStr';

export default defineComponent({
  name: 'OwnReviewDisplay',
  components: { IonNote, RatingStars },
  setup() {
    return {
      arrowForward,
    };
  },
  props: {
    review: {
      type: Object as PropType<PlaceReview>,
      required: true,
    },
  },
  computed: {
    hasBeenModified(): boolean {
      return (
        parseDateStr(this.$props.review.dateCreated).getTime() !==
        parseDateStr(this.$props.review.dateModified).getTime()
      );
    },
    localDateCreatedStr(): string {
      return getLocalDateStr(this.$props.review.dateCreated);
    },
    localDateModifiedStr(): string {
      return getLocalDateStr(this.$props.review.dateModified);
    },
  },
});
</script>

<style scoped>
.rating-stars-container {
  font-size: 24px;
}
.review {
  white-space: pre-wrap;
}
</style>
