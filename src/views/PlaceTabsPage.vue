<template>
  <IonPage>
    <AppHeader :title="title" defaultBackHref="/discover" />
    <IonContent>
      <IonTabs>
        <IonTabBar slot="top">
          <IonTabButton tab="info" href="info">
            <IonLabel>Overview</IonLabel>
          </IonTabButton>
          <IonTabButton tab="reviews" href="reviews">
            <IonLabel>Reviews</IonLabel>
          </IonTabButton>
        </IonTabBar>
        <IonRouterOutlet />
      </IonTabs>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  onIonViewWillEnter,
} from '@ionic/vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import AppHeader from '@/components/common/AppHeader.vue';
import { Place } from '@/model/Place';
import { FETCH_SUGGESTED_PLACE_REVIEWER_NAMES_ACTION } from '@/store/recommend/actions';
import { State } from '@/store/state';

const route = useRoute();
const store = useStore<State>();

onIonViewWillEnter(() => store.dispatch(FETCH_SUGGESTED_PLACE_REVIEWER_NAMES_ACTION, route.params.id));

const place = computed<Place | null>(() => store.getters.suggestedPlaceById(route.params.id));
const title = computed(() => place.value?.title ?? '');
</script>
