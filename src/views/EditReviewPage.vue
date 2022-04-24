<template>
  <IonPage>
    <form @submit.prevent="saveReview()">
      <AppHeader :title="title" defaultBackHref="/myReviews">
        <template v-slot:buttons>
          <IonButton type="submit" :disabled="!formIsValid || isSavingReview">
            <IonIcon slot="icon-only" :icon="save" />
          </IonButton>
        </template>
      </AppHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItemGroup>
                <IonItem>
                  <IonLabel position="fixed">Place *</IonLabel>
                  <PlaceSelect required :disabled="mode === 'edit'" v-model="formData.place" />
                </IonItem>
                <IonItem>
                  <IonLabel>Rating *</IonLabel>
                  <RatingStarsInput v-model="formData.rating" />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Review</IonLabel>
                  <IonTextarea auto-grow rows="5" v-model="formData.review" />
                </IonItem>
              </IonItemGroup>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </form>
  </IonPage>
</template>

<script setup lang="ts">
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
  onIonViewWillEnter,
  useIonRouter,
} from '@ionic/vue';
import { save } from 'ionicons/icons';
import { computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import AppHeader from '@/components/common/AppHeader.vue';
import PlaceSelect from '@/components/reviews/PlaceSelect.vue';
import RatingStarsInput from '@/components/reviews/RatingStarsInput.vue';
import { FullStars } from '@/model/FullStars';
import { PersistentPlaceReviewWithPlace } from '@/model/PersistentPlaceReviewWithPersistentPlace';
import { Place } from '@/model/Place';
import { PlaceReview } from '@/model/PlaceReview';
import { PlaceReviewWithoutPlaceUrl } from '@/model/PlaceReviewWithoutPlaceUrl';
import { ADD_OWN_REVIEW_ACTION, UPDATE_OWN_REVIEW_ACTION } from '@/store/recommend/actions';
import { State } from '@/store/state';
import { showErrorToast } from '@/utils/app/notify/showErrorToast';

const ionRouter = useIonRouter();
const route = useRoute();
const store = useStore<State>();

interface FormData {
  place: Place | null;
  rating: FullStars;
  review: string;
}
const initialFormData: FormData = {
  place: null,
  rating: 3,
  review: '',
};
const formData = reactive<FormData>(initialFormData);
const isSavingReview = ref(false);

const title = computed(() => (mode.value === 'create' ? 'Create' : 'Edit') + ' Review');
const mode = computed<'create' | 'edit'>(() => (route.params.id ? 'edit' : 'create'));
const formIsValid = computed(() => formData.place !== null);

onIonViewWillEnter(() => {
  formData.place = initialFormData.place;
  formData.rating = initialFormData.rating;
  formData.review = initialFormData.review;
  if (mode.value === 'edit') {
    const id = route.params.id;
    const review: PersistentPlaceReviewWithPlace | null = store.getters.ownReviewById(id);
    if (review) {
      formData.place = review.place;
      formData.rating = review.rating;
      formData.review = review.review ?? '';
    }
  }
});

const saveReview = async (): Promise<void> => {
  if (formData.place === null) {
    return;
  }
  if (mode.value === 'create') {
    await createReview();
  } else {
    await updateReview();
  }
};
const createReview = async (): Promise<void> => {
  if (formData.place === null) {
    return;
  }
  const date = new Date();
  const solidProfile = store.state.user.solidProfile;
  if (!solidProfile) {
    return;
  }
  const review: PlaceReviewWithoutPlaceUrl = {
    dateCreated: date,
    dateModified: date,
    creatorWebId: solidProfile.webId,
    rating: formData.rating as FullStars,
    review: formData.review ? formData.review : null,
  };
  try {
    isSavingReview.value = true;
    await store.dispatch(ADD_OWN_REVIEW_ACTION, { review, place: formData.place });
    ionRouter.push('/myReviews');
  } catch {
    await showErrorToast('Saving review failed, please check your connection.');
  } finally {
    isSavingReview.value = false;
  }
};
const updateReview = async (): Promise<void> => {
  if (formData.place === null) {
    return;
  }
  const id = route.params.id;
  const review: PlaceReview | null = store.getters.ownReviewById(id);
  if (review) {
    const updatedReview: PlaceReview = {
      ...review,
      dateModified: new Date(),
      rating: formData.rating as FullStars,
      review: formData.review ? formData.review : null,
    };
    try {
      isSavingReview.value = true;
      await store.dispatch(UPDATE_OWN_REVIEW_ACTION, updatedReview);
      ionRouter.push('/myReviews');
    } catch {
      await showErrorToast('Updating review failed, please check your connection.');
    } finally {
      isSavingReview.value = false;
    }
  }
};
</script>
