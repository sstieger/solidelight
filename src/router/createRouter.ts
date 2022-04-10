import { createWebHistory, createRouter as ionicVueCreateRouter } from '@ionic/vue-router';
import { Router } from 'vue-router';
import { Store } from 'vuex';

import { State } from '@/store/state';

import { createAuthStatusPageGuard } from './guards/createAuthStatusPageGuard';
import { routes } from './routes';

export function createRouter(store: Store<State>): Router {
  const router = ionicVueCreateRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: routes,
  });
  router.beforeEach(createAuthStatusPageGuard(store));
  return router;
}
