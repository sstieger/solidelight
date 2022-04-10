<template>
  <ion-list class="padded-items-list">
    <place-reviews-list-item v-for="review in sortedReviews" v-bind:key="review.id" :review="review" />
  </ion-list>
</template>

<script lang="ts">
import { IonList } from '@ionic/vue';
import { PropType, defineComponent } from '@vue/runtime-core';

import { PlaceReview } from '@/model/PlaceReview';
import { sortArrayByDateFieldDesc } from '@/utils/sort/sortArrayByDateFieldDesc';

import PlaceReviewsListItem from './PlaceReviewsListItem.vue';

export default defineComponent({
  name: 'PlaceReviewsList',
  components: { IonList, PlaceReviewsListItem },
  props: {
    reviews: {
      type: Object as PropType<PlaceReview[]>,
      required: true,
    },
  },
  computed: {
    sortedReviews(): PlaceReview[] {
      return sortArrayByDateFieldDesc(this.reviews, (review: PlaceReview) => review.dateModified);
    },
  },
});
</script>
