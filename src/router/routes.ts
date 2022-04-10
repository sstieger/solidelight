import { RouteRecordRaw } from 'vue-router';

import { DEFAULT_PAGE_PATH } from '@/constants';
import DiscoverPage from '@/views/DiscoverPage.vue';
import EditReviewPage from '@/views/EditReviewPage.vue';
import IntroPage from '@/views/IntroPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import MyReviewsPage from '@/views/MyReviewsPage.vue';
import OpenSourceLicensesPage from '@/views/OpenSourceLicensesPage.vue';
import OwnReviewPage from '@/views/OwnReviewPage.vue';
import PlaceOverviewPage from '@/views/PlaceOverviewPage.vue';
import PlaceReviewsPage from '@/views/PlaceReviewsPage.vue';
import PlaceTabsPage from '@/views/PlaceTabsPage.vue';
import SettingsPage from '@/views/SettingsPage.vue';
import SetupPage from '@/views/SetupPage.vue';
import TabsPage from '@/views/TabsPage.vue';
import TasteProfileHelpPage from '@/views/TasteProfileHelpPage.vue';
import TasteProfilePage from '@/views/TasteProfilePage.vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: DEFAULT_PAGE_PATH,
  },
  {
    path: '/intro',
    component: IntroPage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/setup',
    component: SetupPage,
  },
  {
    path: '/discover/:id/',
    component: PlaceTabsPage,
    children: [
      {
        path: '',
        redirect: 'info',
      },
      {
        path: 'info',
        component: PlaceOverviewPage,
      },
      {
        path: 'reviews',
        component: PlaceReviewsPage,
      },
    ],
  },
  {
    path: '/myReviews/new',
    component: EditReviewPage,
    props: { create: true },
  },
  {
    path: '/myReviews/:id',
    component: OwnReviewPage,
  },
  {
    path: '/myReviews/:id/edit',
    component: EditReviewPage,
  },
  {
    path: '/settings',
    component: SettingsPage,
  },
  {
    path: '/tasteProfileHelp',
    component: TasteProfileHelpPage,
  },
  {
    path: '/openSourceLicenses',
    component: OpenSourceLicensesPage,
  },
  {
    path: '/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: 'discover',
      },
      {
        path: 'discover',
        component: DiscoverPage,
      },
      {
        path: 'myReviews',
        component: MyReviewsPage,
      },
      {
        path: 'tasteProfile',
        component: TasteProfilePage,
      },
    ],
  },
];
