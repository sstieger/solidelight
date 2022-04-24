<template>
  <IonPage>
    <AppHeader :title="title" defaultBackHref="/myReviews">
      <template v-slot:buttons>
        <IonButton id="openOptionsPopover">
          <IonIcon slot="icon-only" :md="ellipsisVertical" :ios="ellipsisHorizontal" />
        </IonButton>
        <IonPopover trigger="openOptionsPopover" :dismiss-on-select="true" side="bottom" alignment="end">
          <IonContent>
            <IonList lines="none">
              <IonItem button :detail="false" :routerLink="editPageUrl">
                <IonLabel>Edit review</IonLabel>
              </IonItem>
              <IonItem button :detail="false" @click="deleteReview()">
                <IonLabel color="danger">Delete review</IonLabel>
              </IonItem>
            </IonList>
          </IonContent>
        </IonPopover>
      </template>
    </AppHeader>
    <IonContent class="ion-padding">
      <OwnReviewDisplay :review="review" />
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonPopover,
  useIonRouter,
} from '@ionic/vue';
import { ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import AppHeader from '@/components/common/AppHeader.vue';
import OwnReviewDisplay from '@/components/reviews/OwnReviewDisplay.vue';
import { PersistentPlaceReviewWithPlace } from '@/model/PersistentPlaceReviewWithPersistentPlace';
import { DELETE_OWN_REVIEW_ACTION } from '@/store/recommend/actions';
import { State } from '@/store/state';

const route = useRoute();
const ionRouter = useIonRouter();
const store = useStore<State>();

const review = computed<PersistentPlaceReviewWithPlace | null>(() => store.getters.ownReviewById(route.params.id));
const title = computed(() => (review.value ? `Review of ${review.value.place.title}` : ''));
const editPageUrl = computed(() => (review.value ? `/myReviews/${review.value.id}/edit` : ''));

const deleteReview = async (): Promise<void> => {
  ionRouter.push('/myReviews');
  await store.dispatch(DELETE_OWN_REVIEW_ACTION, review.value);
};
</script>
