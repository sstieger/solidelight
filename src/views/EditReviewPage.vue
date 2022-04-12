<template>
  <ion-page>
    <form @submit.prevent="saveReview()">
      <app-header :title="title" default-back-href="/myReviews">
        <template v-slot:buttons>
          <ion-button type="submit" :disabled="!formIsValid || isSavingReview">
            <ion-icon slot="icon-only" :icon="save"></ion-icon>
          </ion-button>
        </template>
      </app-header>
      <ion-content fullscreen>
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-item-group>
                <ion-item>
                  <ion-label position="fixed">Place *</ion-label>
                  <place-select required :disabled="mode === 'edit'" v-model="place" />
                </ion-item>
                <ion-item>
                  <ion-label>Rating *</ion-label>
                  <rating-stars-input v-model="rating" />
                </ion-item>
                <ion-item>
                  <ion-label position="floating">Review</ion-label>
                  <ion-textarea auto-grow rows="5" v-model="review" />
                </ion-item>
              </ion-item-group>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>
    </form>
  </ion-page>
</template>

<script lang="ts">
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonPage,
  IonRow,
  IonTextarea,
} from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import { save } from 'ionicons/icons';

import AppHeader from '@/components/common/AppHeader.vue';
import PlaceSelect from '@/components/reviews/PlaceSelect.vue';
import RatingStarsInput from '@/components/reviews/RatingStarsInput.vue';
import { FullStars } from '@/model/FullStars';
import { PersistentPlaceReviewWithPlace } from '@/model/PersistentPlaceReviewWithPersistentPlace';
import { Place } from '@/model/Place';
import { PlaceReview } from '@/model/PlaceReview';
import { PlaceReviewWithoutPlaceUrl } from '@/model/PlaceReviewWithoutPlaceUrl';
import { ADD_OWN_REVIEW_ACTION, UPDATE_OWN_REVIEW_ACTION } from '@/store/recommend/actions';
import { showErrorToast } from '@/utils/app/notify/showErrorToast';

interface Data {
  place: Place | null;
  rating: FullStars;
  review: string;
  isSavingReview: boolean;
}

const initialData: Omit<Data, 'isSavingReview'> = {
  place: null,
  rating: 3,
  review: '',
};

export default defineComponent({
  components: {
    AppHeader,
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonIcon,
    IonItem,
    IonItemGroup,
    IonLabel,
    IonPage,
    IonRow,
    IonTextarea,
    PlaceSelect,
    RatingStarsInput,
  },
  setup() {
    return {
      save,
    };
  },
  props: {
    create: {
      type: Boolean,
      required: false,
      default: false,
    },
    id: {
      type: String,
      required: false,
    },
  },
  data(): Data {
    return { ...initialData, isSavingReview: false };
  },
  async ionViewWillEnter() {
    this.place = initialData.place;
    this.rating = initialData.rating;
    this.review = initialData.review;
    if (this.mode === 'edit') {
      const id = this.$route.params.id;
      const review: PersistentPlaceReviewWithPlace | null = this.$store.getters.ownReviewById(id);
      if (review) {
        this.place = review.place;
        this.rating = review.rating;
        this.review = review.review ?? '';
      }
    }
  },
  computed: {
    title(): string {
      return (this.mode === 'create' ? 'Create' : 'Edit') + ' Review';
    },
    mode(): 'create' | 'edit' {
      return this.$route.params.id ? 'edit' : 'create';
    },
    formIsValid(): boolean {
      return this.place !== null;
    },
  },
  methods: {
    async saveReview(): Promise<void> {
      if (this.place === null) {
        return;
      }
      if (this.mode === 'create') {
        await this.createReview();
      } else {
        await this.updateReview();
      }
    },
    async createReview(): Promise<void> {
      if (this.place === null) {
        return;
      }
      const date = new Date();
      const solidProfile = this.$store.state.user.solidProfile;
      const review: PlaceReviewWithoutPlaceUrl = {
        dateCreated: date,
        dateModified: date,
        creatorWebId: solidProfile.webId,
        rating: this.rating as FullStars,
        review: this.review ? this.review : null,
      };
      try {
        this.isSavingReview = true;
        await this.$store.dispatch(ADD_OWN_REVIEW_ACTION, { review, place: this.place });
        await this.$router.push('/myReviews');
      } catch {
        await showErrorToast('Saving review failed, please check your connection.');
      } finally {
        this.isSavingReview = false;
      }
    },
    async updateReview(): Promise<void> {
      if (this.place === null) {
        return;
      }
      const id = this.$route.params.id;
      const review: PlaceReview | null = this.$store.getters.ownReviewById(id);
      if (review) {
        const updatedReview: PlaceReview = {
          ...review,
          dateModified: new Date(),
          rating: this.rating as FullStars,
          review: this.review,
        };
        try {
          this.isSavingReview = true;
          await this.$store.dispatch(UPDATE_OWN_REVIEW_ACTION, updatedReview);
          await this.$router.push('/myReviews');
        } catch {
          await showErrorToast('Updating review failed, please check your connection.');
        } finally {
          this.isSavingReview = false;
        }
      }
    },
  },
});
</script>
