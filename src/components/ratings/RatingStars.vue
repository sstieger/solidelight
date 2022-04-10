<template>
  <ion-icon :icon="star" v-for="n in fullStars" v-bind:key="n" />
  <ion-icon :icon="starHalf" v-if="halfStar" />
  <ion-icon :icon="starOutline" v-for="n in emptyStars" v-bind:key="n" />
</template>

<script lang="ts">
import { IonIcon } from '@ionic/vue';
import { PropType, defineComponent } from '@vue/runtime-core';
import { star, starHalf, starOutline } from 'ionicons/icons';

import { HalfStars } from '@/model/HalfStars';

export default defineComponent({
  name: 'RatingStars',
  components: { IonIcon },
  setup() {
    return {
      star,
      starHalf,
      starOutline,
    };
  },
  props: {
    stars: {
      type: Number as PropType<HalfStars>,
      required: true,
    },
  },
  computed: {
    fullStars(): number {
      return Math.floor(this.stars);
    },
    halfStar(): boolean {
      return this.stars % 1 !== 0;
    },
    emptyStars(): number {
      return 5 - this.fullStars - (this.halfStar ? 1 : 0);
    },
  },
});
</script>
