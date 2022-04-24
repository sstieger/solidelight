<template>
  <IonGrid>
    <IonRow class="ion-justify-content-center">
      <IonCol size="10">
        <form @submit.prevent="login()">
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Identity Provider</IonLabel>
                <IonInput v-model="identityProvider"></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol class="ion-text-center">
              <IonButton type="submit" :disabled="!identityProviderIsValid">Log In</IonButton>
            </IonCol>
          </IonRow>
        </form>
        <IonRow class="ion-margin-vertical ion-text-center">
          <IonCol>or log in with</IonCol>
        </IonRow>
        <IonRow class="ion-text-center">
          <IonCol>
            <IonButton @click="loginWithSolidCommunity()">Solid Community</IonButton>
          </IonCol>
        </IonRow>
        <IonRow class="ion-text-center">
          <IonCol>
            <IonButton @click="loginWithInrupt()">Inrupt</IonButton>
          </IonCol>
        </IonRow>
        <IonRow class="ion-margin-top ion-text-center">
          <IonCol>
            <IonNote>You will be redirected to your identity provider for the login process.</IonNote>
          </IonCol>
        </IonRow>
      </IonCol>
    </IonRow>
  </IonGrid>
</template>

<script setup lang="ts">
import { IonButton, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonNote, IonRow } from '@ionic/vue';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

import { State } from '@/store/state';
import { LOGIN_ACTION } from '@/store/user/actions';
import { showErrorToast } from '@/utils/app/notify/showErrorToast';
import { isValidUrl } from '@/utils/validate/isValidUrl';

const store = useStore<State>();

const identityProvider = ref(store.state.user.identityProvider);

const identityProviderIsValid = computed(() => isValidUrl(identityProvider.value));

const loginWithSolidCommunity = async (): Promise<void> => {
  const url = 'https://solidcommunity.net';
  identityProvider.value = url;
  await login();
};
const loginWithInrupt = async (): Promise<void> => {
  const url = 'https://inrupt.net';
  identityProvider.value = url;
  await login();
};
const login = async (): Promise<void> => {
  try {
    await store.dispatch(LOGIN_ACTION, identityProvider.value);
  } catch (err) {
    await showErrorToast('Identity provider unreachable, please check the URL and your connection.');
  }
};
</script>
