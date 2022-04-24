<template>
  <IonPage>
    <AppHeader title="My Reviews" :showBackButton="false" showSettingsButton />
    <IonContent fullscreen>
      <IonRefresher slot="fixed" @ionRefresh="refresh">
        <IonRefresherContent />
      </IonRefresher>
      <OwnReviewsList v-if="ownReviews.length" />
      <NoOwnReviews v-else />
      <CreateFab routerLink="/myReviews/new" />
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonRefresher, IonRefresherContent, RefresherCustomEvent } from '@ionic/vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

import AppHeader from '@/components/common/AppHeader.vue';
import CreateFab from '@/components/common/CreateFab.vue';
import NoOwnReviews from '@/components/reviews/NoOwnReviews.vue';
import OwnReviewsList from '@/components/reviews/OwnReviewsList.vue';
import { FETCH_OWN_REVIEWS_ACTION } from '@/store/recommend/actions';
import { State } from '@/store/state';
import { refreshWithNotificationOnError } from '@/utils/app/refresh/refreshWithNotificationOnError';

const store = useStore<State>();

const ownReviews = computed(() => store.state.recommend.ownReviews);

const refresh = async (event: RefresherCustomEvent) => {
  await refreshWithNotificationOnError(event, () => store.dispatch(FETCH_OWN_REVIEWS_ACTION));
};
</script>
