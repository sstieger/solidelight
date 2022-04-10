<template>
  <ion-button fill="clear" v-for="n in filledStars" v-bind:key="n" @click="setValue(n)">
    <ion-icon slot="icon-only" :icon="star" />
  </ion-button>
  <ion-button fill="clear" v-for="n in emptyStars" v-bind:key="n" @click="setValue(filledStars + n)">
    <ion-icon slot="icon-only" :icon="starOutline" />
  </ion-button>
</template>

<script lang="ts">
import { IonButton, IonIcon } from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import { star, starOutline } from 'ionicons/icons';

import { FullStars } from '@/model/FullStars';

export default defineComponent({
  name: 'RatingStarsInput',
  components: {
    IonButton,
    IonIcon,
  },
  setup() {
    return { star, starOutline };
  },
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
  },
  methods: {
    setValue(value: FullStars): void {
      this.$emit('update:modelValue', value);
    },
  },
  computed: {
    filledStars(): number {
      return Math.floor(this.modelValue);
    },
    emptyStars(): number {
      return 5 - this.filledStars;
    },
  },
});
</script>
