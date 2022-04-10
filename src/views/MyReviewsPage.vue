<template>
  <ion-page>
    <app-header title="My Reviews" :show-back-button="false" show-settings-button />
    <ion-content fullscreen>
      <ion-refresher slot="fixed" @ionRefresh="refresh">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <own-reviews-list v-if="ownReviews.length" />
      <no-own-reviews v-else />
      <create-fab router-link="/myReviews/new" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonRefresher, IonRefresherContent, RefresherCustomEvent } from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import { mapState } from 'vuex';

import AppHeader from '@/components/common/AppHeader.vue';
import CreateFab from '@/components/common/CreateFab.vue';
import NoOwnReviews from '@/components/reviews/NoOwnReviews.vue';
import OwnReviewsList from '@/components/reviews/OwnReviewsList.vue';
import { FETCH_OWN_REVIEWS_ACTION } from '@/store/recommend/actions';
import { State } from '@/store/state';
import { refreshWithNotificationOnError } from '@/utils/app/refresh/refreshWithNotificationOnError';

export default defineComponent({
  components: {
    AppHeader,
    CreateFab,
    IonContent,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    NoOwnReviews,
    OwnReviewsList,
  },
  computed: mapState<State>({
    ownReviews: (state: State) => state.recommend.ownReviews,
  }),
  methods: {
    async refresh(event: RefresherCustomEvent) {
      await refreshWithNotificationOnError(event, () => this.$store.dispatch(FETCH_OWN_REVIEWS_ACTION));
    },
  },
});
</script>
