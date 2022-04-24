<template>
  <IonGrid class="app-content-centered-vertically ion-text-center">
    <IonRow>
      <IonCol>
        <IonIcon class="large-icon" :icon="sync" />
      </IonCol>
    </IonRow>
    <IonRow>
      <IonCol>
        <IonNote>Loading Solidelight ...</IonNote>
      </IonCol>
    </IonRow>
  </IonGrid>
</template>

<script setup lang="ts">
import { IonCol, IonGrid, IonIcon, IonNote, IonRow } from '@ionic/vue';
import { sync } from 'ionicons/icons';
</script>
