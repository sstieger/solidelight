<template>
  <IonPage>
    <AppHeader title="Taste Profile Help" defaultBackHref="/tasteProfile" />
    <IonContent fullscreen>
      <IonAccordionGroup>
        <IonAccordion>
          <IonItem slot="header">
            <IonLabel class="question-item">How is my taste profile generated?</IonLabel>
          </IonItem>
          <div slot="content" class="ion-padding">
            <IonText>
              I create your taste profile based on your positive ratings (with at least 3 stars) of places you have
              visited. Particularly high ratings also have a stronger influence than lower ratings.<br />
              An example: if you positively rate Italian restaurants often, you will see this reflected in your
              profile.<br />
              By the way: your profile gets updated automatically whenever you add, edit, or remove a rating.
            </IonText>
          </div>
        </IonAccordion>
        <IonAccordion>
          <IonItem slot="header">
            <IonLabel class="question-item">What are base types and variations?</IonLabel>
          </IonItem>
          <div slot="content" class="ion-padding">
            <IonText>
              These are food types offered at a certain place or categories a place belongs to. One base type, for
              example, is "European", describing food typically prepared in Europe. Other base types may be more
              specific, like "French", or "Spanish". <br />
              Variations are more specific types, such as "French-Alsatian", or "French-Provencale".
            </IonText>
          </div>
        </IonAccordion>
        <IonAccordion>
          <IonItem slot="header">
            <IonLabel class="question-item">Why do some types appear both in base types and variations?</IonLabel>
          </IonItem>
          <div slot="content" class="ion-padding">
            <IonText>
              This is due to the fact that there are no variations to some types and categories (for example "Pizza" or
              "Vegan"). Moreover, if a restaurant is only tagged as "French", the variation type will also be "French".
              However, if it is tagged as "French-Alsatian", the base type will be "French" and the variation
              "French-Alsatian".
            </IonText>
          </div>
        </IonAccordion>
        <IonAccordion>
          <IonItem slot="header">
            <IonLabel class="question-item">What do the percentages mean?</IonLabel>
          </IonItem>
          <div slot="content" class="ion-padding">
            <IonText>
              The percentages describe how important a certain food or restaurant type is for you (within the group of
              all your liked base types or variations), according to your ratings. The higher this value, the more
              likely I will suggest places offering that specific type.
            </IonText>
          </div>
        </IonAccordion>
      </IonAccordionGroup>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { IonAccordion, IonAccordionGroup, IonContent, IonItem, IonLabel, IonPage, IonText } from '@ionic/vue';

import AppHeader from '@/components/common/AppHeader.vue';
</script>

<style scoped>
.question-item {
  white-space: normal;
}
</style>
