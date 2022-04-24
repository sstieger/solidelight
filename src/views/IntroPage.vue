<template>
  <IonPage>
    <IonContent fullscreen class="ion-padding">
      <swiper :modules="swiperModules" keyboard pagination zoom class="app-content-fullscreen">
        <SwiperSlide class="app-content-fullscreen">
          <div>
            <IonRow>
              <IonCol>
                <IonIcon class="large-icon" :icon="restaurant" />&nbsp;
                <IonIcon class="large-icon" :icon="pizza" />&nbsp; <IonIcon class="large-icon" :icon="beer" />&nbsp;
                <IonIcon class="large-icon" :icon="cafe" />
              </IonCol>
            </IonRow>
            <IonRow class="ion-margin-top">
              <IonCol><h1>Solidelight</h1></IonCol>
            </IonRow>
            <IonRow class="ion-margin-top">
              <IonCol>Hi!</IonCol>
            </IonRow>
            <IonRow class="ion-margin-top">
              <IonCol>I am your new personal mobile restaurant and bar guide.</IonCol>
            </IonRow>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <IonRow>
              <IonCol><h1>How does it work?</h1></IonCol>
            </IonRow>
            <IonRow class="ion-margin-top">
              <IonCol>
                <IonIcon class="large-icon" :icon="starHalf" />
              </IonCol>
            </IonRow>
            <IonRow class="ion-margin-top">
              <IonCol>You add and rate your favorite places.</IonCol>
            </IonRow>
            <IonRow>
              <IonCol><IonNote>I will use that to figure out what you like.</IonNote></IonCol>
            </IonRow>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <IonRow>
              <IonCol><h1>How does it work?</h1></IonCol>
            </IonRow>
            <IonRow class="ion-margin-top">
              <IonCol>
                <IonIcon class="large-icon" :icon="colorWand" />
              </IonCol>
            </IonRow>
            <IonRow class="ion-margin-top">
              <IonCol>I will suggest places close to your current location!</IonCol>
            </IonRow>
            <IonRow>
              <IonCol><IonNote>Please allow geolocation access for that to work.</IonNote></IonCol>
            </IonRow>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <IonRow>
              <IonCol>
                <IonIcon class="large-icon" :icon="fileTrayFull" />&nbsp;
                <IonIcon class="large-icon" :icon="lockClosed" />&nbsp;
              </IonCol>
            </IonRow>
            <IonRow class="ion-margin-top">
              <IonCol>
                <h1>Everything under your control.</h1>
              </IonCol>
            </IonRow>
            <IonRow class="ion-margin-top">
              <IonCol>
                I will store your data on your personal
                <a href="https://solidproject.org/about" target="_blank" rel="noopener noreferrer">Solid</a> Pod.
              </IonCol>
            </IonRow>
            <IonRow class="ion-margin-top">
              <IonCol>
                If you need one, check out
                <a
                  href="https://solidproject.org/users/get-a-pod#get-a-pod-from-a-pod-provider"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  these providers.
                </a>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol><IonNote>And if you have one already, just continue.</IonNote></IonCol>
            </IonRow>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <IonRow>
              <IonCol>
                <IonIcon class="large-icon" :icon="logIn" />
              </IonCol>
            </IonRow>
            <IonRow class="ion-margin-top">
              <IonCol>
                <h1>Login</h1>
              </IonCol>
            </IonRow>
            <IonRow class="ion-margin-top">
              <IonCol>To log in, you need to enter the URL of your Solid Identity Provider.</IonCol>
            </IonRow>
            <IonRow>
              <IonCol>You will then be redirected to your login page.</IonCol>
            </IonRow>
            <IonRow>
              <IonCol><IonNote>Don't worry, you will come back automatically after logging in.</IonNote></IonCol>
            </IonRow>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <IonRow>
              <IonCol>
                <IonIcon class="large-icon" :icon="key" />
              </IonCol>
            </IonRow>
            <IonRow class="ion-margin-top">
              <IonCol>
                <h1>Authorization</h1>
              </IonCol>
            </IonRow>
            <IonRow class="ion-margin-top">
              <IonCol>
                When you log in for the first time, you will be asked to authorize Solidelight to access your Pod.
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                Please make sure to grant at least permission to <span class="bold">read</span>,
                <span class="bold">add</span>, and <span class="bold">modify</span> documents.
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonNote>This is required for me to be able to store and access your data.</IonNote>
              </IonCol>
            </IonRow>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <IonRow>
              <IonCol>
                <IonIcon class="large-icon" :icon="shareSocial" />
              </IonCol>
            </IonRow>
            <IonRow class="ion-margin-top">
              <IonCol>
                <h1>Sharing</h1>
              </IonCol>
            </IonRow>
            <IonRow class="ion-margin-top">
              <IonCol>You can choose to share your ratings and reviews with other users.</IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                If you plan to do so, you also need to grant permission to <span class="bold">manage access</span> to
                your Pod.
              </IonCol>
            </IonRow>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <IonRow>
              <IonCol>
                <IonIcon class="large-icon" :icon="checkmarkDone" />
              </IonCol>
            </IonRow>
            <IonRow class="ion-margin-top">
              <IonCol>
                <h1>You're all set!</h1>
              </IonCol>
            </IonRow>
            <IonRow class="ion-margin-top">
              <IonCol>Ready to be solidelighted?</IonCol>
            </IonRow>
            <IonRow class="ion-margin-top">
              <IonCol><IonButton @click="enterApp()">Let's go!</IonButton></IonCol>
            </IonRow>
          </div>
        </SwiperSlide>
      </swiper>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonCol,
  IonContent,
  IonIcon,
  IonNote,
  IonPage,
  IonRow,
  IonicSlides,
  useIonRouter,
} from '@ionic/vue';
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
import { useStore } from 'vuex';

/* eslint-disable-next-line import/no-unresolved */
import 'swiper/css';
/* eslint-disable-next-line import/no-unresolved */
import 'swiper/css/keyboard';
/* eslint-disable-next-line import/no-unresolved */
import 'swiper/css/pagination';
import '@ionic/vue/css/ionic-swiper.css';

import { DEFAULT_PAGE_PATH, LOGIN_PAGE_PATH } from '@/constants';
import { UserProgress } from '@/model/UserProgress';
import { State } from '@/store/state';
import { SET_HAS_SEEN_INTRO_MUTATION } from '@/store/user/mutations';

const ionRouter = useIonRouter();
const store = useStore<State>();

const swiperModules = [Keyboard, Pagination, IonicSlides];

const enterApp = async (): Promise<void> => {
  const userProgress: UserProgress = store.state.user.userProgress;
  if (userProgress < UserProgress.INTRO_SEEN) {
    store.commit(SET_HAS_SEEN_INTRO_MUTATION);
  }
  const targetPath = userProgress >= UserProgress.LOGGED_IN ? DEFAULT_PAGE_PATH : LOGIN_PAGE_PATH;
  ionRouter.push(targetPath);
};
</script>
