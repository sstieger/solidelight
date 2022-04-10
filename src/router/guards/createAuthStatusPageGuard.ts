import { NavigationGuard } from 'vue-router';
import { Store } from 'vuex';

import { DEFAULT_PAGE_PATH, INTRO_PAGE_PATH, LOGIN_PAGE_PATH, SETUP_PAGE_PATH } from '@/constants';
import { UserProgress } from '@/model/UserProgress';
import { State } from '@/store/state';

export function createAuthStatusPageGuard(store: Store<State>): NavigationGuard {
  return ({ path: targetPath }) => {
    if (targetPath === INTRO_PAGE_PATH) {
      return;
    }
    const userProgress = store.state.user.userProgress;
    if (userProgress === UserProgress.NONE) {
      return INTRO_PAGE_PATH;
    }
    if (targetPath !== LOGIN_PAGE_PATH && userProgress < UserProgress.LOGGED_IN) {
      return LOGIN_PAGE_PATH;
    }
    if (targetPath !== SETUP_PAGE_PATH && userProgress === UserProgress.LOGGED_IN) {
      return SETUP_PAGE_PATH;
    }
    if (
      (targetPath === LOGIN_PAGE_PATH || targetPath === SETUP_PAGE_PATH) &&
      userProgress >= UserProgress.APP_CONTAINER_URL_SET
    ) {
      return DEFAULT_PAGE_PATH;
    }
  };
}
