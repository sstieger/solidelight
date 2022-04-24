<template>
  <IonPage>
    <IonTabs>
      <IonRouterOutlet />
      <IonTabBar slot="bottom">
        <IonTabButton tab="discover" href="/discover">
          <IonIcon :icon="search" />
          <IonLabel>Discover</IonLabel>
        </IonTabButton>
        <IonTabButton tab="myReviews" href="/myReviews">
          <IonIcon :icon="starHalf" />
          <IonLabel>My Reviews</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tasteProfile" href="/tasteProfile">
          <IonIcon :icon="person" />
          <IonLabel>Taste Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonPage>
</template>

<script setup lang="ts">
import { IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/vue';
import { person, search, starHalf } from 'ionicons/icons';
</script>
