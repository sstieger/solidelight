<template>
  <ion-page>
    <ion-content>
      <template v-if="place">
        <no-place-reviews v-if="!place.reviews.length" />
        <place-reviews-list v-else :reviews="place.reviews" />
      </template>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import { mapGetters } from 'vuex';

import NoPlaceReviews from '@/components/places/NoPlaceReviews.vue';
import PlaceReviewsList from '@/components/places/PlaceReviewsList.vue';
import { Place } from '@/model/Place';

export default defineComponent({
  components: {
    IonContent,
    IonPage,
    NoPlaceReviews,
    PlaceReviewsList,
  },
  computed: {
    place(): Place | null {
      return this.suggestedPlaceById(this.$route.params.id);
    },
    title(): string {
      return this.place?.title ?? '';
    },
    ...mapGetters(['suggestedPlaceById']),
  },
});
</script>
