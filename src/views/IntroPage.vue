<template>
  <ion-page>
    <ion-content fullscreen class="ion-padding">
      <swiper :modules="swiperModules" keyboard pagination zoom class="app-content-fullscreen">
        <swiper-slide class="app-content-fullscreen">
          <div>
            <ion-row>
              <ion-col>
                <ion-icon class="large-icon" :icon="restaurant" />&nbsp;
                <ion-icon class="large-icon" :icon="pizza" />&nbsp; <ion-icon class="large-icon" :icon="beer" />&nbsp;
                <ion-icon class="large-icon" :icon="cafe" />
              </ion-col>
            </ion-row>
            <ion-row class="ion-margin-top">
              <ion-col><h1>Solidelight</h1></ion-col>
            </ion-row>
            <ion-row class="ion-margin-top">
              <ion-col>Hi!</ion-col>
            </ion-row>
            <ion-row class="ion-margin-top">
              <ion-col>I am your new personal mobile restaurant and bar guide.</ion-col>
            </ion-row>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div>
            <ion-row>
              <ion-col><h1>How does it work?</h1></ion-col>
            </ion-row>
            <ion-row class="ion-margin-top">
              <ion-col>
                <ion-icon class="large-icon" :icon="starHalf" />
              </ion-col>
            </ion-row>
            <ion-row class="ion-margin-top">
              <ion-col>You add and rate your favorite places.</ion-col>
            </ion-row>
            <ion-row>
              <ion-col><ion-note>I will use that to figure out what you like.</ion-note></ion-col>
            </ion-row>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div>
            <ion-row>
              <ion-col><h1>How does it work?</h1></ion-col>
            </ion-row>
            <ion-row class="ion-margin-top">
              <ion-col>
                <ion-icon class="large-icon" :icon="colorWand" />
              </ion-col>
            </ion-row>
            <ion-row class="ion-margin-top">
              <ion-col>I will suggest places close to your current location!</ion-col>
            </ion-row>
            <ion-row>
              <ion-col><ion-note>Please allow geolocation access for that to work.</ion-note></ion-col>
            </ion-row>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div>
            <ion-row>
              <ion-col>
                <ion-icon class="large-icon" :icon="fileTrayFull" />&nbsp;
                <ion-icon class="large-icon" :icon="lockClosed" />&nbsp;
              </ion-col>
            </ion-row>
            <ion-row class="ion-margin-top">
              <ion-col>
                <h1>Everything under your control.</h1>
              </ion-col>
            </ion-row>
            <ion-row class="ion-margin-top">
              <ion-col>
                I will store your data on your personal
                <a href="https://solidproject.org/about" target="_blank" rel="noopener noreferrer">Solid</a> Pod.
              </ion-col>
            </ion-row>
            <ion-row class="ion-margin-top">
              <ion-col>
                If you need one, check out
                <a
                  href="https://solidproject.org/users/get-a-pod#get-a-pod-from-a-pod-provider"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  these providers.
                </a>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col><ion-note>And if you have one already, just continue.</ion-note></ion-col>
            </ion-row>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div>
            <ion-row>
              <ion-col>
                <ion-icon class="large-icon" :icon="logIn" />
              </ion-col>
            </ion-row>
            <ion-row class="ion-margin-top">
              <ion-col>
                <h1>Login</h1>
              </ion-col>
            </ion-row>
            <ion-row class="ion-margin-top">
              <ion-col>To log in, you need to enter the URL of your Solid Identity Provider.</ion-col>
            </ion-row>
            <ion-row>
              <ion-col>You will then be redirected to your login page.</ion-col>
            </ion-row>
            <ion-row>
              <ion-col><ion-note>Don't worry, you will come back automatically after logging in.</ion-note></ion-col>
            </ion-row>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div>
            <ion-row>
              <ion-col>
                <ion-icon class="large-icon" :icon="key" />
              </ion-col>
            </ion-row>
            <ion-row class="ion-margin-top">
              <ion-col>
                <h1>Authorization</h1>
              </ion-col>
            </ion-row>
            <ion-row class="ion-margin-top">
              <ion-col>
                When you log in for the first time, you will be asked to authorize Solidelight to access your Pod.
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                Please make sure to grant at least permission to <span class="bold">read</span>,
                <span class="bold">add</span>, and <span class="bold">modify</span> documents.
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <ion-note>This is required for me to be able to store and access your data.</ion-note>
              </ion-col>
            </ion-row>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div>
            <ion-row>
              <ion-col>
                <ion-icon class="large-icon" :icon="shareSocial" />
              </ion-col>
            </ion-row>
            <ion-row class="ion-margin-top">
              <ion-col>
                <h1>Sharing</h1>
              </ion-col>
            </ion-row>
            <ion-row class="ion-margin-top">
              <ion-col>You can choose to share your ratings and reviews with other users.</ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                If you plan to do so, you also need to grant permission to <span class="bold">manage access</span> to
                your Pod.
              </ion-col>
            </ion-row>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div>
            <ion-row>
              <ion-col>
                <ion-icon class="large-icon" :icon="checkmarkDone" />
              </ion-col>
            </ion-row>
            <ion-row class="ion-margin-top">
              <ion-col>
                <h1>You're all set!</h1>
              </ion-col>
            </ion-row>
            <ion-row class="ion-margin-top">
              <ion-col>Ready to be solidelighted?</ion-col>
            </ion-row>
            <ion-row class="ion-margin-top">
              <ion-col><ion-button @click="enterApp()">Let's go!</ion-button></ion-col>
            </ion-row>
          </div>
        </swiper-slide>
      </swiper>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonButton, IonCol, IonContent, IonIcon, IonNote, IonPage, IonRow, IonicSlides } from '@ionic/vue';
import { defineComponent } from '@vue/runtime-core';
import {
  beer,
  cafe,
  checkmarkDone,
  colorWand,
  fileTrayFull,
  key,
  lockClosed,
  logIn,
  pizza,
  restaurant,
  shareSocial,
  starHalf,
} from 'ionicons/icons';
import { Keyboard, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

/* eslint-disable-next-line import/no-unresolved */
import 'swiper/css';
/* eslint-disable-next-line import/no-unresolved */
import 'swiper/css/keyboard';
/* eslint-disable-next-line import/no-unresolved */
import 'swiper/css/pagination';
import '@ionic/vue/css/ionic-swiper.css';
import { DEFAULT_PAGE_PATH, LOGIN_PAGE_PATH } from '@/constants';
import { UserProgress } from '@/model/UserProgress';
import { SET_HAS_SEEN_INTRO_MUTATION } from '@/store/user/mutations';

export default defineComponent({
  components: {
    IonButton,
    IonCol,
    IonContent,
    IonIcon,
    IonNote,
    IonPage,
    IonRow,
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      swiperModules: [Keyboard, Pagination, IonicSlides],
      beer,
      cafe,
      checkmarkDone,
      colorWand,
      fileTrayFull,
      key,
      lockClosed,
      logIn,
      pizza,
      restaurant,
      shareSocial,
      starHalf,
    };
  },
  methods: {
    async enterApp(): Promise<void> {
      const userProgress: UserProgress = this.$store.state.user.userProgress;
      if (userProgress < UserProgress.INTRO_SEEN) {
        this.$store.commit(SET_HAS_SEEN_INTRO_MUTATION);
      }
      const targetPath = userProgress >= UserProgress.LOGGED_IN ? DEFAULT_PAGE_PATH : LOGIN_PAGE_PATH;
      await this.$router.push(targetPath);
    },
  },
});
</script>
