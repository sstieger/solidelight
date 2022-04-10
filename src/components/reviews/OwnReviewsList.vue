<template>
  <ion-list class="padded-items-list">
    <own-reviews-list-item v-for="review in ownReviewsByLastModifiedDate" v-bind:key="review.id" :review="review" />
  </ion-list>
</template>

<script lang="ts">
import { IonList } from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import { mapGetters } from 'vuex';

import OwnReviewsListItem from './OwnReviewsListItem.vue';

export default defineComponent({
  name: 'OwnReviewsList',
  components: { IonList, OwnReviewsListItem },
  computed: mapGetters(['ownReviewsByLastModifiedDate']),
});
</script>
