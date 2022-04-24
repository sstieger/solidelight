<template>
  <IonGrid class="app-content-centered-vertically ion-text-center">
    <IonRow>
      <IonCol>
        <IonIcon class="large-icon" :icon="glasses" />
      </IonCol>
    </IonRow>
    <IonRow>
      <IonCol>
        <IonNote>No suggestions available here.</IonNote>
      </IonCol>
    </IonRow>
  </IonGrid>
</template>

<script setup lang="ts">
import { IonCol, IonGrid, IonIcon, IonNote, IonRow } from '@ionic/vue';
import { glasses } from 'ionicons/icons';
</script>
