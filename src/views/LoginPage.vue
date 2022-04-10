<template>
  <ion-page>
    <app-header title="Login" :show-back-button="false" />
    <ion-content>
      <div class="app-content-centered-vertically">
        <login-form />
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';

import AppHeader from '@/components/common/AppHeader.vue';
import LoginForm from '@/components/login/LoginForm.vue';

export default defineComponent({
  components: { AppHeader, IonContent, IonPage, LoginForm },
});
</script>
