<template>
  <IonButton fill="clear" v-for="n in filledStars" v-bind:key="n" @click="setValue(n as FullStars)">
    <IonIcon slot="icon-only" :icon="star" />
  </IonButton>
  <IonButton fill="clear" v-for="n in emptyStars" v-bind:key="n" @click="setValue(filledStars + n)">
    <IonIcon slot="icon-only" :icon="starOutline" />
  </IonButton>
</template>

<script setup lang="ts">
import { IonButton, IonIcon } from '@ionic/vue';
import { star, starOutline } from 'ionicons/icons';
import { computed, defineEmits, defineProps } from 'vue';

import { FullStars } from '@/model/FullStars';

const emit = defineEmits<{
  (e: 'update:modelValue', value: FullStars): void;
}>();

interface Props {
  modelValue: FullStars;
}
const props = defineProps<Props>();

const filledStars = computed(() => props.modelValue);
const emptyStars = computed(() => 5 - filledStars.value);

const setValue = (value: FullStars): void => {
  emit('update:modelValue', value);
};
</script>
