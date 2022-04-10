<template>
  <ion-grid>
    <ion-row class="ion-justify-content-center">
      <ion-col size="10">
        <form @submit.prevent="loginWithCustomProvider()">
          <ion-row>
            <ion-col>
              <ion-item>
                <ion-label position="stacked">Identity Provider</ion-label>
                <ion-input v-model="identityProvider"></ion-input>
              </ion-item>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col class="ion-text-center">
              <ion-button type="submit" :disabled="!identityProviderIsValid">Log In</ion-button>
            </ion-col>
          </ion-row>
        </form>
        <ion-row class="ion-margin-vertical ion-text-center">
          <ion-col>or log in with</ion-col>
        </ion-row>
        <ion-row class="ion-text-center">
          <ion-col>
            <ion-button @click="loginWithSolidCommunity()">Solid Community</ion-button>
          </ion-col>
        </ion-row>
        <ion-row class="ion-text-center">
          <ion-col>
            <ion-button @click="loginWithInrupt()">Inrupt</ion-button>
          </ion-col>
        </ion-row>
        <ion-row class="ion-margin-top ion-text-center">
          <ion-col>
            <ion-note>You will be redirected to your identity provider for the login process.</ion-note>
          </ion-col>
        </ion-row>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { IonButton, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonNote, IonRow } from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';

import { LOGIN_ACTION } from '@/store/user/actions';
import { showErrorToast } from '@/utils/app/notify/showErrorToast';
import { isValidUrl } from '@/utils/validate/isValidUrl';

export default defineComponent({
  name: 'LoginForm',
  components: { IonButton, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonNote, IonRow },
  data() {
    return {
      identityProvider: this.$store.state.user.identityProvider,
    };
  },
  computed: {
    identityProviderIsValid(): boolean {
      return isValidUrl(this.identityProvider);
    },
  },
  methods: {
    async loginWithCustomProvider(): Promise<void> {
      await this.login(this.identityProvider);
    },
    async loginWithSolidCommunity(): Promise<void> {
      const url = 'https://solidcommunity.net';
      this.identityProvider = url;
      await this.login(url);
    },
    async loginWithInrupt(): Promise<void> {
      const url = 'https://inrupt.net';
      this.identityProvider = url;
      await this.login(url);
    },
    async login(identityProvider: string): Promise<void> {
      try {
        await this.$store.dispatch(LOGIN_ACTION, identityProvider);
      } catch (err) {
        await showErrorToast('Identity provider unreachable, please check the URL and your connection.');
      }
    },
  },
});
</script>
