<template>
  <ion-page>
    <app-header :title="title" default-back-href="/myReviews">
      <template v-slot:buttons>
        <ion-button id="openOptionsPopover">
          <ion-icon slot="icon-only" :md="ellipsisVertical" :ios="ellipsisHorizontal" />
        </ion-button>
        <ion-popover trigger="openOptionsPopover" :dismiss-on-select="true" side="bottom" alignment="end">
          <ion-content>
            <ion-list lines="none">
              <ion-item button :detail="false" :router-link="editPageUrl">
                <ion-label>Edit review</ion-label>
              </ion-item>
              <ion-item button :detail="false" @click="deleteReview()">
                <ion-label color="danger">Delete review</ion-label>
              </ion-item>
            </ion-list>
          </ion-content>
        </ion-popover>
      </template>
    </app-header>
    <ion-content class="ion-padding">
      <own-review-display :review="review" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonButton, IonContent, IonIcon, IonItem, IonLabel, IonList, IonPage, IonPopover } from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import { ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
import { mapGetters } from 'vuex';

import AppHeader from '@/components/common/AppHeader.vue';
import OwnReviewDisplay from '@/components/reviews/OwnReviewDisplay.vue';
import { PersistentPlaceReviewWithPlace } from '@/model/PersistentPlaceReviewWithPersistentPlace';
import { DELETE_OWN_REVIEW_ACTION } from '@/store/recommend/actions';

export default defineComponent({
  components: {
    AppHeader,
    IonButton,
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonPopover,
    OwnReviewDisplay,
  },
  setup() {
    return { ellipsisHorizontal, ellipsisVertical };
  },
  computed: {
    review(): PersistentPlaceReviewWithPlace | null {
      return this.ownReviewById(this.$route.params.id);
    },
    title(): string {
      const title = this.review?.place.title;
      return title ? `Review of ${title}` : '';
    },
    editPageUrl(): string {
      return `/myReviews/${this.review?.id}/edit`;
    },
    ...mapGetters(['ownReviewById']),
  },
  methods: {
    async deleteReview(): Promise<void> {
      this.$router.replace('/myReviews');
      await this.$store.dispatch(DELETE_OWN_REVIEW_ACTION, this.review);
    },
  },
});
</script>
