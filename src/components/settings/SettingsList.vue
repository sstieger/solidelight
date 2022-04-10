<template>
  <ion-list>
    <ion-item v-if="webId">
      <ion-label>Web ID</ion-label>
      <ion-label class="ion-text-wrap">{{ webId }}</ion-label>
    </ion-item>
    <ion-item v-if="nickname">
      <ion-label>Nickname</ion-label>
      {{ nickname }}
    </ion-item>
    <ion-item v-if="name">
      <ion-label>Name</ion-label>
      {{ name }}
    </ion-item>
    <ion-item>
      <ion-label>Storage Location</ion-label>
      <ion-label class="ion-text-wrap">
        {{ appContainerUrl }}
      </ion-label>
    </ion-item>
    <ion-item>
      <ion-label>Color Scheme</ion-label>
      <ion-select interface="popover" :value="colorScheme" @ionChange="setColorScheme($event.detail)">
        <ion-select-option value="system">System</ion-select-option>
        <ion-select-option value="light">Light</ion-select-option>
        <ion-select-option value="dark">Dark</ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item>
      <ion-label>Explain Suggestions</ion-label>
      <ion-toggle @ionChange="setExplainSuggestions($event.detail)" :checked="explainSuggestions" />
    </ion-item>
    <ion-item>
      <ion-label>Public Reviews</ion-label>
      <ion-toggle
        @ionChange="setPublicReadAccess($event.detail)"
        :checked="publicReadAccess"
        :disabled="isUpdatingPublicReadAccess"
      />
    </ion-item>
    <ion-item button :detail="false" router-link="/intro">
      <ion-label>Show App Intro</ion-label>
    </ion-item>
    <ion-item button :detail="false" @click="deleteSolidelightProfile()">
      <ion-label color="danger">Delete Solidelight Profile and Data</ion-label>
    </ion-item>
    <ion-item button :detail="false" @click="logout()">
      <ion-label color="primary">Logout</ion-label>
    </ion-item>
  </ion-list>
  <ion-list>
    <ion-list-header>
      <ion-label>About</ion-label>
    </ion-list-header>
    <ion-item>
      <ion-label>Solidelight 0.1.0</ion-label>
    </ion-item>
    <ion-item button :detail="false" router-link="/openSourceLicenses">
      <ion-label>Open Source Licenses</ion-label>
    </ion-item>
  </ion-list>
</template>

<script lang="ts">
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
} from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import { mapState } from 'vuex';

import { LOGIN_PAGE_PATH } from '@/constants';
import { State } from '@/store/state';
import { DELETE_DATA_ACTION, LOGOUT_ACTION, SET_PUBLIC_READ_ACCESS_ACTION } from '@/store/user/actions';
import { SET_COLOR_SCHEME_MUTATION, SET_EXPLAIN_SUGGESTIONS_MUTATION } from '@/store/user/mutations';
import { ColorScheme } from '@/utils/app/colorScheme/ColorScheme';
import { showErrorToast } from '@/utils/app/notify/showErrorToast';

interface Data {
  isUpdatingPublicReadAccess: boolean;
  isDeletingSolidelightProfile: boolean;
}

export default defineComponent({
  name: 'SettingsList',
  components: { IonItem, IonLabel, IonList, IonListHeader, IonSelect, IonSelectOption, IonToggle },
  data(): Data {
    return {
      isUpdatingPublicReadAccess: false,
      isDeletingSolidelightProfile: false,
    };
  },
  computed: mapState<State>({
    webId: (state: State) => state.user.sessionInfo?.webId,
    nickname: (state: State) => state.user.solidProfile?.nickname,
    name: (state: State) => state.user.solidProfile?.name,
    appContainerUrl: (state: State) => state.user.appContainerUrl,
    colorScheme: (state: State) => state.user.colorScheme,
    explainSuggestions: (state: State) => state.user.explainSuggestions,
    publicReadAccess: (state: State) => state.user.publicReadAccess,
  }),
  methods: {
    setColorScheme({ value }: SelectChangeEventDetail<ColorScheme>): void {
      this.$store.commit(SET_COLOR_SCHEME_MUTATION, value);
    },
    setExplainSuggestions({ checked: explainSuggestions }: ToggleChangeEventDetail): void {
      this.$store.commit(SET_EXPLAIN_SUGGESTIONS_MUTATION, explainSuggestions);
    },
    async setPublicReadAccess({ checked: publicReadAccess }: ToggleChangeEventDetail): Promise<void> {
      if (this.isDeletingSolidelightProfile) {
        return;
      }
      if (publicReadAccess === this.$store.state.user.publicReadAcces) {
        return;
      }
      this.isUpdatingPublicReadAccess = true;
      try {
        await this.$store.dispatch(SET_PUBLIC_READ_ACCESS_ACTION, { publicReadAccess, notifyConnectNode: true });
      } catch (err) {
        await showErrorToast((err as Error).message);
      }
      this.isUpdatingPublicReadAccess = false;
    },
    async deleteSolidelightProfile(): Promise<void> {
      const alert = await alertController.create({
        header: 'Delete Solidelight Profile and Data',
        message: 'This will irrevocably delete your Solidelight data from your Pod and log you out.<br>Are you sure?',
        buttons: [
          { text: 'No', role: 'cancel' },
          {
            text: 'Yes',
            role: 'destructive',
            handler: async () => {
              this.isDeletingSolidelightProfile = true;
              await this.$store.dispatch(DELETE_DATA_ACTION);
              await this.$router.push(LOGIN_PAGE_PATH);
              this.isDeletingSolidelightProfile = false;
            },
          },
        ],
      });
      await alert.present();
    },
    async logout(): Promise<void> {
      await this.$store.dispatch(LOGOUT_ACTION);
      await this.$router.push(LOGIN_PAGE_PATH);
    },
  },
});
</script>
