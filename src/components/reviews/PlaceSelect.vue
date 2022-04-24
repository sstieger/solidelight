<template>
  <IonInput :required="required" :disabled="disabled" :value="modelValue?.title" @focusin="openSelectModal()" />
  <IonModal :is-open="selectModalIsOpen" @didDismiss="closeSelectModal()">
    <IonContent fullscreen>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Select a Place</IonTitle>
          <CloseModalButton @click="closeSelectModal()" />
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar debounce="300" v-model="placeSearchStr"></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonList>
        <IonItem v-for="place in selectablePlaces" v-bind:key="place.hereId" @click="selectPlace(place)">
          {{ place.address }}
        </IonItem>
      </IonList>
    </IonContent>
  </IonModal>
</template>

<script setup lang="ts">
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
import { defineEmits, defineProps, ref, watch, withDefaults } from 'vue';
import { useStore } from 'vuex';

import CloseModalButton from '@/components/common/CloseModalButton.vue';
import { mapPlatform } from '@/map/mapPlatform';
import { Place } from '@/model/Place';
import { State } from '@/store/state';
import { showErrorToast } from '@/utils/app/notify/showErrorToast';
import { autocompleteEatAndDrinkPlaces } from '@/utils/map/autocompleteEatAndDrinkPlaces';
import { buildAddressStr } from '@/utils/map/buildAddressStr';
import { lookupPlace } from '@/utils/map/lookupPlace';

const store = useStore<State>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: Omit<Place, 'id'>): void;
}>();

interface Props {
  modelValue?: Place | null;
  required?: boolean;
  disabled?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false,
});

const selectModalIsOpen = ref(false);
const placeSearchStr = ref('');
const selectablePlaces = ref<Omit<Place, 'id'>[]>([]);

watch(placeSearchStr, async (newPlaceSearchStr: string): Promise<void> => {
  if (newPlaceSearchStr === '') {
    selectablePlaces.value = [];
  } else {
    try {
      const lat = store.state.user.geolocationPosition?.coords.latitude ?? 0;
      const long = store.state.user.geolocationPosition?.coords.longitude ?? 0;
      const mapPlaces = await autocompleteEatAndDrinkPlaces(mapPlatform, newPlaceSearchStr, lat, long);
      selectablePlaces.value = mapPlaces.map((mapPlace) => {
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
});

const openSelectModal = (): void => {
  if (!props.disabled) {
    selectModalIsOpen.value = true;
  }
};
const selectPlace = async (place: Place): Promise<void> => {
  closeSelectModal();
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
    emit('update:modelValue', selectedPlace);
  } catch {
    await showErrorToast('Retriewing place information failed, please try again later.');
  }
};
const closeSelectModal = (): void => {
  selectModalIsOpen.value = false;
};
</script>
