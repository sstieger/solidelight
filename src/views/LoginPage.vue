<template>
  <IonPage>
    <AppHeader title="Login" :showBackButton="false" />
    <IonContent>
      <div class="app-content-centered-vertically">
        <LoginForm />
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';

import AppHeader from '@/components/common/AppHeader.vue';
import LoginForm from '@/components/login/LoginForm.vue';
</script>
