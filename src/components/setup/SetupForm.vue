<template>
  <ion-grid>
    <ion-row class="ion-justify-content-center">
      <ion-col size="10">
        <form @submit.prevent="save()">
          <ion-row>
            <ion-col>
              <ion-item>
                <ion-label position="stacked">Pod</ion-label>
                <ion-select v-model="pod" interface="action-sheet">
                  <ion-select-option v-for="availablePod in availablePods" v-bind:key="availablePod">
                    {{ availablePod }}
                  </ion-select-option>
                </ion-select>
              </ion-item>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-item>
                <ion-label position="stacked">Path</ion-label>
                <ion-input v-model="path"></ion-input>
              </ion-item>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-item>
                <ion-label position="stacked">Public Sharing</ion-label>
                <ion-checkbox v-model="publicReadAccess"></ion-checkbox>
                <ion-note>Sharing your reviews allows other Solidelight users to find and read them.</ion-note>
              </ion-item>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col class="ion-text-center">
              <ion-button type="submit" :disabled="!pathIsValid">Save</ion-button>
            </ion-col>
          </ion-row>
        </form>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
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
} from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import { mapState } from 'vuex';

import { DEFAULT_PAGE_PATH } from '@/constants';
import { State as RootState } from '@/store/state';
import { SETUP_ACTION } from '@/store/user/actions';

export default defineComponent({
  name: 'SetupForm',
  components: {
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
  },
  data() {
    const pods = this.$store.state.user.solidProfile?.pods;
    return {
      pod: pods && pods.length ? pods[0] : null,
      path: '/solidelight',
      publicReadAccess: true,
    };
  },
  computed: {
    pathIsValid(): boolean {
      return this.pod !== null && !!this.path.replace('\\', '/').match('^(/)?([^/\0]+(/)?)+');
    },
    ...mapState<RootState>({
      availablePods: (state: RootState) => state.user.solidProfile?.pods ?? [],
    }),
  },
  methods: {
    async save(): Promise<void> {
      await this.$store.dispatch(SETUP_ACTION, {
        pod: this.pod,
        path: this.path.replace('\\', '/'),
        publicReadAccess: this.publicReadAccess,
      });
      await this.$router.push(DEFAULT_PAGE_PATH);
    },
  },
});
</script>
