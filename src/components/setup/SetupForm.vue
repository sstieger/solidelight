<template>
  <IonGrid>
    <IonRow class="ion-justify-content-center">
      <IonCol size="10">
        <form @submit.prevent="save()">
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Pod</IonLabel>
                <IonSelect v-model="pod" interface="action-sheet">
                  <IonSelectOption v-for="availablePod in availablePods" v-bind:key="availablePod">
                    {{ availablePod }}
                  </IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Path</IonLabel>
                <IonInput v-model="path"></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Public Sharing</IonLabel>
                <IonCheckbox v-model="publicReadAccess"></IonCheckbox>
                <IonNote>Sharing your reviews allows other Solidelight users to find and read them.</IonNote>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol class="ion-text-center">
              <IonButton type="submit" :disabled="!pathIsValid">Save</IonButton>
            </IonCol>
          </IonRow>
        </form>
      </IonCol>
    </IonRow>
  </IonGrid>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonRow,
  IonSelect,
  IonSelectOption,
  useIonRouter,
} from '@ionic/vue';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

import { DEFAULT_PAGE_PATH } from '@/constants';
import { State } from '@/store/state';
import { SETUP_ACTION } from '@/store/user/actions';

const ionRouter = useIonRouter();
const store = useStore<State>();

const pods = store.state.user.solidProfile?.pods;
const pod = ref(pods && pods.length ? pods[0] : null);
const path = ref('/solidelight');
const publicReadAccess = ref(true);

const pathIsValid = computed(() => pod.value !== null && !!path.value.replace('\\', '/').match('^(/)?([^/\0]+(/)?)+'));
const availablePods = computed(() => store.state.user.solidProfile?.pods ?? []);

const save = async (): Promise<void> => {
  await store.dispatch(SETUP_ACTION, {
    pod: pod.value,
    path: path.value.replace('\\', '/'),
    publicReadAccess: publicReadAccess.value,
  });
  ionRouter.push(DEFAULT_PAGE_PATH);
};
</script>
