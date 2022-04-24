<template>
  <IonGrid class="app-content-centered-vertically ion-text-center">
    <IonRow>
      <IonCol>
        <IonIcon class="large-icon" :icon="location" />
      </IonCol>
    </IonRow>
    <IonRow>
      <IonCol>
        <IonNote>Your current location could not be detected.</IonNote>
      </IonCol>
    </IonRow>
    <IonRow>
      <IonCol>
        <IonNote>Please allow your browser and this website to access your location.</IonNote>
      </IonCol>
    </IonRow>
  </IonGrid>
</template>

<script setup lang="ts">
import { IonCol, IonGrid, IonIcon, IonNote, IonRow } from '@ionic/vue';
import { location } from 'ionicons/icons';
</script>
