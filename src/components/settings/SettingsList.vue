<template>
  <IonList>
    <IonItem v-if="webId">
      <IonLabel>Web ID</IonLabel>
      <IonLabel class="ion-text-wrap">{{ webId }}</IonLabel>
    </IonItem>
    <IonItem v-if="nickname">
      <IonLabel>Nickname</IonLabel>
      {{ nickname }}
    </IonItem>
    <IonItem v-if="name">
      <IonLabel>Name</IonLabel>
      {{ name }}
    </IonItem>
    <IonItem>
      <IonLabel>Storage Location</IonLabel>
      <IonLabel class="ion-text-wrap">
        {{ appContainerUrl }}
      </IonLabel>
    </IonItem>
    <IonItem>
      <IonLabel>Color Scheme</IonLabel>
      <IonSelect interface="popover" :value="colorScheme" @ionChange="setColorScheme($event.detail)">
        <IonSelectOption value="system">System</IonSelectOption>
        <IonSelectOption value="light">Light</IonSelectOption>
        <IonSelectOption value="dark">Dark</IonSelectOption>
      </IonSelect>
    </IonItem>
    <IonItem>
      <IonLabel>Explain Suggestions</IonLabel>
      <IonToggle @ionChange="setExplainSuggestions($event.detail)" :checked="explainSuggestions" />
    </IonItem>
    <IonItem>
      <IonLabel>Public Reviews</IonLabel>
      <IonToggle
        @ionChange="setPublicReadAccess($event.detail)"
        :checked="publicReadAccess"
        :disabled="isUpdatingPublicReadAccess"
      />
    </IonItem>
    <IonItem button :detail="false" routerLink="/intro">
      <IonLabel>Show App Intro</IonLabel>
    </IonItem>
    <IonItem button :detail="false" @click="deleteSolidelightProfile()">
      <IonLabel color="danger">Delete Solidelight Profile and Data</IonLabel>
    </IonItem>
    <IonItem button :detail="false" @click="logout()">
      <IonLabel color="primary">Logout</IonLabel>
    </IonItem>
  </IonList>
  <IonList>
    <IonListHeader>
      <IonLabel>About</IonLabel>
    </IonListHeader>
    <IonItem>
      <IonLabel>Solidelight 0.1.0</IonLabel>
    </IonItem>
    <IonItem button :detail="false" routerLink="/openSourceLicenses">
      <IonLabel>Open Source Licenses</IonLabel>
    </IonItem>
  </IonList>
</template>

<script setup lang="ts">
import {
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonSelect,
  IonSelectOption,
  IonToggle,
  SelectChangeEventDetail,
  ToggleChangeEventDetail,
  alertController,
  useIonRouter,
} from '@ionic/vue';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

import { LOGIN_PAGE_PATH } from '@/constants';
import { State } from '@/store/state';
import { DELETE_DATA_ACTION, LOGOUT_ACTION, SET_PUBLIC_READ_ACCESS_ACTION } from '@/store/user/actions';
import { SET_COLOR_SCHEME_MUTATION, SET_EXPLAIN_SUGGESTIONS_MUTATION } from '@/store/user/mutations';
import { ColorScheme } from '@/utils/app/colorScheme/ColorScheme';
import { showErrorToast } from '@/utils/app/notify/showErrorToast';

const ionRouter = useIonRouter();
const store = useStore<State>();

const isUpdatingPublicReadAccess = ref(false);
const isDeletingSolidelightProfile = ref(false);

const webId = computed(() => store.state.user.solidProfile?.webId);
const nickname = computed(() => store.state.user.solidProfile?.nickname);
const name = computed(() => store.state.user.solidProfile?.name);
const appContainerUrl = computed(() => store.state.user.appContainerUrl);
const colorScheme = computed(() => store.state.user.colorScheme);
const explainSuggestions = computed(() => store.state.user.explainSuggestions);
const publicReadAccess = computed(() => store.state.user.publicReadAccess);

const setColorScheme = ({ value }: SelectChangeEventDetail<ColorScheme>): void => {
  store.commit(SET_COLOR_SCHEME_MUTATION, value);
};
const setExplainSuggestions = ({ checked: explainSuggestions }: ToggleChangeEventDetail): void => {
  store.commit(SET_EXPLAIN_SUGGESTIONS_MUTATION, explainSuggestions);
};
const setPublicReadAccess = async ({ checked: publicReadAccess }: ToggleChangeEventDetail): Promise<void> => {
  if (isDeletingSolidelightProfile.value) {
    return;
  }
  if (publicReadAccess === store.state.user.publicReadAccess) {
    return;
  }
  isUpdatingPublicReadAccess.value = true;
  try {
    await store.dispatch(SET_PUBLIC_READ_ACCESS_ACTION, { publicReadAccess, notifyConnectNode: true });
  } catch (err) {
    await showErrorToast((err as Error).message);
  }
  isUpdatingPublicReadAccess.value = false;
};
const deleteSolidelightProfile = async (): Promise<void> => {
  const alert = await alertController.create({
    header: 'Delete Solidelight Profile and Data',
    message: 'This will irrevocably delete your Solidelight data from your Pod and log you out.<br>Are you sure?',
    buttons: [
      { text: 'No', role: 'cancel' },
      {
        text: 'Yes',
        role: 'destructive',
        handler: async () => {
          isDeletingSolidelightProfile.value = true;
          await store.dispatch(DELETE_DATA_ACTION);
          ionRouter.push(LOGIN_PAGE_PATH);
          isDeletingSolidelightProfile.value = false;
        },
      },
    ],
  });
  await alert.present();
};
const logout = async (): Promise<void> => {
  await store.dispatch(LOGOUT_ACTION);
  ionRouter.push(LOGIN_PAGE_PATH);
};
</script>
