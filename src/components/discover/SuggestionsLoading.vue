<template>
  <IonGrid class="app-content-centered-vertically ion-text-center">
    <IonRow>
      <IonCol>
        <IonIcon class="large-icon" :icon="search" />
      </IonCol>
    </IonRow>
    <IonRow>
      <IonCol>
        <IonNote>Finding suggestions for you ...</IonNote>
      </IonCol>
    </IonRow>
  </IonGrid>
</template>

<script setup lang="ts">
import { IonCol, IonGrid, IonIcon, IonNote, IonRow } from '@ionic/vue';
import { search } from 'ionicons/icons';
</script>
