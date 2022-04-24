<template>
  <IonItem>
    <div>
      <div>
        <IonNote>{{ lastModifiedDateLocalStr }}</IonNote>
      </div>
      <div><RatingStars :stars="review.rating" /></div>
      <div v-if="authorName">
        <IonNote>{{ authorName }}</IonNote>
      </div>
      <div class="review" v-if="review.review">
        <IonNote>{{ review.review }}</IonNote>
      </div>
    </div>
  </IonItem>
</template>

<script setup lang="ts">
import { IonItem, IonNote } from '@ionic/vue';
import { computed, defineProps } from 'vue';
import { useStore } from 'vuex';

import RatingStars from '@/components/ratings/RatingStars.vue';
import { PlaceReview } from '@/model/PlaceReview';
import { State } from '@/store/state';
import { getLocalDateStr } from '@/utils/date/getLocalDateStr';

const store = useStore<State>();

interface Props {
  review: PlaceReview;
}
const props = defineProps<Props>();

const lastModifiedDateLocalStr = computed(() => getLocalDateStr(props.review.dateModified));
const authorName = computed<{ id: string; name: string | null }[] | null>(
  () => store.getters.suggestedPlaceReviewerById(props.review.creatorWebId)?.name,
);
</script>

<style scoped>
.review {
  white-space: pre-wrap;
}
</style>
