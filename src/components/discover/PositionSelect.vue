<template>
  <IonInput :required="required" :disabled="disabled" :value="modelValue?.title" @click="openSelectModal()" />
  <IonModal :is-open="selectModalIsOpen" @didDismiss="closeSelectModal()">
    <IonContent fullscreen>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Select a Position</IonTitle>
          <CloseModalButton @click="closeSelectModal()" />
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar debounce="300" v-model="positionSearchStr"></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonList>
        <IonItem v-for="position in selectablePositions" v-bind:key="position.id" @click="selectPosition(position)">
          {{ position.address }}
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

import CloseModalButton from '@/components/common/CloseModalButton.vue';

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
}>();

interface Props {
  modelValue?: any;
  required?: boolean;
  disabled?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false,
});

const selectModalIsOpen = ref(false);
const positionSearchStr = ref('');
const selectablePositions = ref<any>([]);

watch(positionSearchStr, (newPositionSearchStr) => {
  if (newPositionSearchStr === '') {
    selectablePositions.value = [];
  }
});

const openSelectModal = (): void => {
  if (!props.disabled) {
    selectModalIsOpen.value = true;
  }
};
const selectPosition = (position: any): void => {
  closeSelectModal();
  emit('update:modelValue', position);
};
const closeSelectModal = (): void => {
  selectModalIsOpen.value = false;
};
</script>
