<template>
  <ion-input :required="required" :disabled="disabled" :value="modelValue?.title" @click="openSelectModal()" />
  <ion-modal :is-open="selectModalIsOpen" @didDismiss="closeSelectModal()">
    <ion-content fullscreen>
      <ion-header translucent>
        <ion-toolbar>
          <ion-title>Select a Place</ion-title>
          <close-modal-button @click="closeSelectModal()" />
        </ion-toolbar>
        <ion-toolbar>
          <ion-searchbar debounce="300" v-model="placeSearchStr"></ion-searchbar>
        </ion-toolbar>
      </ion-header>
      <ion-list>
        <ion-item v-for="place in selectablePlaces" v-bind:key="place.id" @click="selectPlace(place)">
          {{ place.address }}
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
import { mapPlatform } from '@/map/mapPlatform';
import { Place } from '@/model/Place';
import { showErrorToast } from '@/utils/app/notify/showErrorToast';
import { autocompleteEatAndDrinkPlaces } from '@/utils/map/autocompleteEatAndDrinkPlaces';
import { buildAddressStr } from '@/utils/map/buildAddressStr';
import { lookupPlace } from '@/utils/map/lookupPlace';

type Data = {
  selectModalIsOpen: boolean;
  placeSearchStr: string;
  selectablePlaces: Omit<Place, 'id'>[];
};

export default defineComponent({
  name: 'PlaceSelect',
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
      placeSearchStr: '',
      selectablePlaces: [],
    };
  },
  props: {
    modelValue: {
      type: Object as PropType<Place | null>,
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
    async placeSearchStr(placeSearchStr: string): Promise<void> {
      if (placeSearchStr === '') {
        this.selectablePlaces = [];
      } else {
        try {
          const lat = this.$store.state.user.geolocationPosition?.coords.latitude ?? 0;
          const long = this.$store.state.user.geolocationPosition?.coords.longitude ?? 0;
          const mapPlaces = await autocompleteEatAndDrinkPlaces(mapPlatform, placeSearchStr, lat, long);
          this.selectablePlaces = mapPlaces.map((mapPlace) => {
            return {
              hereId: mapPlace.id,
              title: mapPlace.title,
              address: mapPlace.address.label,
              categories: mapPlace.categories.map((cat) => cat.id),
              foodTypes: mapPlace.foodTypes.map((type) => type.id),
              latitude: mapPlace.position.lat,
              longitude: mapPlace.position.lng,
            };
          });
        } catch {
          await showErrorToast('Searching for places failed, please try again later.');
        }
      }
    },
  },
  methods: {
    openSelectModal(): void {
      if (!this.disabled) {
        this.selectModalIsOpen = true;
      }
    },
    async selectPlace(place: Place): Promise<void> {
      this.closeSelectModal();
      try {
        const fullPlace = await lookupPlace(mapPlatform, place.hereId);
        const selectedPlace: Omit<Place, 'id'> = {
          hereId: fullPlace.id,
          title: fullPlace.title,
          address: buildAddressStr(fullPlace.address),
          categories: fullPlace.categories.map((cat) => cat.id),
          foodTypes: fullPlace.foodTypes.map((type) => type.id),
          latitude: fullPlace.position.lat,
          longitude: fullPlace.position.lng,
        };
        this.$emit('update:modelValue', selectedPlace);
      } catch {
        await showErrorToast('Retriewing place information failed, please try again later.');
      }
    },
    closeSelectModal(): void {
      this.selectModalIsOpen = false;
    },
  },
});
</script>
