<template>
  <IonList class="padded-items-list">
    <PlaceReviewsListItem v-for="review in sortedReviews" v-bind:key="review.id" :review="review" />
  </IonList>
</template>

<script setup lang="ts">
import { IonList } from '@ionic/vue';
import { computed, defineProps } from 'vue';

import { PlaceReview } from '@/model/PlaceReview';
import { sortArrayByDateFieldDesc } from '@/utils/sort/sortArrayByDateFieldDesc';

import PlaceReviewsListItem from './PlaceReviewsListItem.vue';

interface Props {
  reviews: PlaceReview[];
}
const props = defineProps<Props>();

const sortedReviews = computed(() =>
  sortArrayByDateFieldDesc(props.reviews, (review: PlaceReview) => review.dateModified),
);
</script>
