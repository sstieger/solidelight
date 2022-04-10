<template>
  <ion-item>
    <div>
      <div>
        <ion-note>{{ lastModifiedDateLocalStr }}</ion-note>
      </div>
      <div><rating-stars :stars="review.rating" /></div>
      <div v-if="authorName">
        <ion-note>{{ authorName }}</ion-note>
      </div>
      <div class="review" v-if="review.review">
        <ion-note>{{ review.review }}</ion-note>
      </div>
    </div>
  </ion-item>
</template>

<script lang="ts">
import { IonItem, IonNote } from '@ionic/vue';
import { PropType, defineComponent } from '@vue/runtime-core';
import { mapGetters } from 'vuex';

import RatingStars from '@/components/ratings/RatingStars.vue';
import { PlaceReview } from '@/model/PlaceReview';
import { getLocalDateStr } from '@/utils/date/getLocalDateStr';

interface Data {
  name: string | null;
}

export default defineComponent({
  name: 'PlaceReviewsListItem',
  components: { IonItem, IonNote, RatingStars },
  data(): Data {
    return { name: null };
  },
  props: {
    review: {
      type: Object as PropType<PlaceReview>,
      required: true,
    },
  },
  computed: {
    lastModifiedDateLocalStr(): string {
      return getLocalDateStr(this.$props.review.dateModified);
    },
    authorName(): string | null {
      return this.suggestedPlaceReviewerById(this.$props.review.creatorWebId)?.name;
    },
    ...mapGetters(['suggestedPlaceReviewerById']),
  },
});
</script>

<style scoped>
.review {
  white-space: pre-wrap;
}
</style>
