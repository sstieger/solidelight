<template>
  <IonList class="padded-items-list">
    <OwnReviewsListItem v-for="review in ownReviewsByLastModifiedDate" v-bind:key="review.id" :review="review" />
  </IonList>
</template>

<script setup lang="ts">
import { IonList } from '@ionic/vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

import { State } from '@/store/state';

import OwnReviewsListItem from './OwnReviewsListItem.vue';

const store = useStore<State>();

const ownReviewsByLastModifiedDate = computed(() => store.getters.ownReviewsByLastModifiedDate);
</script>
