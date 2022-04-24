<template>
  <IonIcon :icon="star" v-for="n in fullStars" v-bind:key="n" />
  <IonIcon :icon="starHalf" v-if="halfStar" />
  <IonIcon :icon="starOutline" v-for="n in emptyStars" v-bind:key="n" />
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import { star, starHalf, starOutline } from 'ionicons/icons';
import { computed, defineProps } from 'vue';

import { HalfStars } from '@/model/HalfStars';

interface Props {
  stars: HalfStars;
}
const props = defineProps<Props>();

const fullStars = computed(() => Math.floor(props.stars));
const halfStar = computed(() => props.stars % 1 !== 0);
const emptyStars = computed(() => 5 - fullStars.value - (halfStar.value ? 1 : 0));
</script>
