<template>
  <ion-input :required="required" :disabled="disabled" :value="modelValue?.title" @click="openSelectModal()" />
  <ion-modal :is-open="selectModalIsOpen" @didDismiss="closeSelectModal()">
    <ion-content fullscreen>
      <ion-header translucent>
        <ion-toolbar>
          <ion-title>Select a Position</ion-title>
          <close-modal-button @click="closeSelectModal()" />
        </ion-toolbar>
        <ion-toolbar>
          <ion-searchbar debounce="300" v-model="positionSearchStr"></ion-searchbar>
        </ion-toolbar>
      </ion-header>
      <ion-list>
        <ion-item v-for="position in selectablePositions" v-bind:key="position.id" @click="selectPosition(position)">
          {{ position.address }}
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-modal>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonModal,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import { PropType, defineComponent } from '@vue/runtime-core';

import CloseModalButton from '@/components/common/CloseModalButton.vue';

type Data = {
  selectModalIsOpen: boolean;
  positionSearchStr: string;
  selectablePositions: any[];
};

export default defineComponent({
  name: 'PositionSelect',
  components: {
    CloseModalButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonList,
    IonModal,
    IonSearchbar,
    IonTitle,
    IonToolbar,
  },
  emits: ['update:modelValue'],
  data(): Data {
    return {
      selectModalIsOpen: false,
      positionSearchStr: '',
      selectablePositions: [],
    };
  },
  props: {
    modelValue: {
      type: Object as PropType<any>,
      required: false,
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  watch: {
    async positionSearchStr(positionSearchStr: string): Promise<void> {
      if (positionSearchStr === '') {
        this.selectablePositions = [];
      } else {
        /*const lat = this.$store.state.user.geolocationPosition?.coords.latitude ?? 0;
        const long = this.$store.state.user.geolocationPosition?.coords.longitude ?? 0;
        const mapPositions = await autocom(mapPlatform, positionSearchStr, lat, long);
        this.selectablePositions = mapPositions.map((mapPosition) => {
          return {
            id: mapPosition.id,
            title: mapPosition.title,
            address: mapPosition.address.label,
          };
        });*/
      }
    },
  },
  methods: {
    openSelectModal(): void {
      if (!this.disabled) {
        this.selectModalIsOpen = true;
      }
    },
    selectPosition(position: any): void {
      this.closeSelectModal();
      this.$emit('update:modelValue', position);
    },
    closeSelectModal(): void {
      this.selectModalIsOpen = false;
    },
  },
});
</script>
