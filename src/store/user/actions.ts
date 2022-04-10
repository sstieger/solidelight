import { fetch, getDefaultSession, logout } from '@inrupt/solid-client-authn-browser';
import { ActionTree } from 'vuex';

import { login } from '@/auth/login';
import { GEOLOCATION_POSITION_PARAMS } from '@/constants';
import { Preferences } from '@/model/Preferences';
import { UserProgress } from '@/model/UserProgress';
import { deleteData } from '@/solid/deleteData';
import { sendJoinMessageToConnectNode } from '@/solid/message/sendJoinMessageToConnectNode';
import { sendLeaveMessageToConnectNode } from '@/solid/message/sendLeaveMessageToConnectNode';
import { getPreferences, updatePreferences } from '@/solid/preferences';
import { buildDefaultProfile, getProfile } from '@/solid/profile';
import { getPublicReadAccess, setPublicReadAccess } from '@/solid/publicReadAccess';
import { FETCH_OWN_REVIEWS_ACTION } from '@/store/recommend/actions';
import { CLEAR_RECOMMEND_STATE_MUTATION as CLEAR_RECOMMEND_STATE_MUTATION } from '@/store/recommend/mutations';
import { State as RootState } from '@/store/state';
import { getCurrentPosition } from '@/utils/app/geolocation/getCurrentPosition';
import { stopWatchingPosition } from '@/utils/app/geolocation/stopWatchingPosition';
import { showErrorToast } from '@/utils/app/notify/showErrorToast';
import { joinPathParts } from '@/utils/path/joinPathParts';
import { SolidProfile } from '@/utils/solid/SolidProfile';
import { getSolidProfile } from '@/utils/solid/getSolidProfile';

import {
  CLEAR_USER_STATE_MUTATION,
  SET_APP_CONTAINER_URL_MUTATION,
  SET_GEOLOCATION_POSITION_MUTATION,
  SET_GEOLOCATION_UNAVAILABLE_MUTATION,
  SET_GEOLOCATION_WATCH_ID_MUTATION,
  SET_IDENTITY_PROVIDER_MUTATION,
  SET_INITIAL_FETCH_COMPLETE_MUTATION,
  SET_INITIAL_FETCH_RUNNING_MUTATION,
  SET_PUBLIC_READ_ACCESS_MUTATION,
  SET_SESSION_INFO_MUTATION,
  SET_SOLID_PROFILE_MUTATION,
  UNSET_GEOLOCATION_WATCH_ID_MUTATION,
} from './mutations';
import { State } from './state';

export const LOGIN_ACTION = 'login';
export const DETECT_CURRENT_AUTH_STATE_AND_SESSION_ACTION = 'detectCurrentAuthStateAndSession';
export const INITIAL_FETCH_ACTION = 'initialFetch';
export const FETCH_SOLID_PROFILE_ACTION = 'fetchSolidProfile';
export const SETUP_ACTION = 'setupAction';
export const FETCH_PREFERENCES_ACTION = 'fetchPreferences';
export const FETCH_PUBLIC_READ_ACCESS_ACTION = 'fetchPublicReadAccess';
export const FETCH_PROFILE_ACTION = 'fetchProfile';
export const SET_PUBLIC_READ_ACCESS_ACTION = 'setPublicReadAccess';
export const DELETE_DATA_ACTION = 'deleteData';
export const GEOLOCATE_ACTION = 'geolocate';
export const START_WATCHING_GEOLOCATION_POSITION_ACTION = 'startWatchingGeolocationPosition';
export const STOP_WATCHING_GEOLOCATION_POSITION_ACTION = 'stopWatchingGeolocationPosition';
export const LOGOUT_ACTION = 'logout';

export const actions: ActionTree<State, RootState> = {
  async [LOGIN_ACTION]({ commit }, identityProvider: string) {
    commit(SET_IDENTITY_PROVIDER_MUTATION, identityProvider);
    // Here we will redirect to the identity provider therefore we won't get
    // any meaningful result to continue working with. After returning from the
    // identity provider, auth state has to be checked very early after loading
    // the app by a redirect handler. After, and only after that, the action
    // "detectCurrentAuthStateAndSession" needs to be dispatched in order to
    // reflect the current auth state in the app's state.
    await login(identityProvider);
  },
  [DETECT_CURRENT_AUTH_STATE_AND_SESSION_ACTION]({ commit }) {
    const session = getDefaultSession();
    if (session.info.isLoggedIn) {
      commit(SET_SESSION_INFO_MUTATION, session.info);
    } else {
      commit(CLEAR_USER_STATE_MUTATION);
    }
  },
  async [INITIAL_FETCH_ACTION]({ dispatch, commit, state }) {
    if (state.userProgress < UserProgress.APP_CONTAINER_URL_SET) {
      return;
    }
    commit(SET_INITIAL_FETCH_RUNNING_MUTATION);
    try {
      await dispatch(FETCH_PREFERENCES_ACTION);
      await Promise.all([
        dispatch(FETCH_PUBLIC_READ_ACCESS_ACTION).catch(() => null),
        dispatch(FETCH_PROFILE_ACTION),
        dispatch(FETCH_OWN_REVIEWS_ACTION),
      ]);
    } finally {
      commit(SET_INITIAL_FETCH_COMPLETE_MUTATION);
    }
  },
  async [FETCH_SOLID_PROFILE_ACTION]({ commit, state }) {
    if (!state.sessionInfo || !state.sessionInfo.webId) {
      throw new Error('Fetching Solid profile not possible, no session or Web ID');
    }
    const { avatar, name, nickname, inbox, preferencesFile, pods } = await getSolidProfile(
      state.sessionInfo.webId,
      fetch,
    );
    const profile: SolidProfile = {
      webId: state.sessionInfo.webId,
      avatar,
      name,
      nickname,
      inbox,
      preferencesFile,
      pods,
    };
    // We need to have at least one pod for the app to work.
    if (pods && pods.length) {
      commit(SET_SOLID_PROFILE_MUTATION, profile);
    } else {
      commit(SET_SOLID_PROFILE_MUTATION, null);
    }
  },
  async [SETUP_ACTION]({ commit, dispatch, state }, params: { pod: string; path: string; publicReadAccess: boolean }) {
    if (!state.solidProfile) {
      throw new Error('Updating preferences not possible, no Solid profile');
    }
    if (!state.solidProfile.preferencesFile) {
      throw new Error('Updating preferences not possible, no preferences file link in Solid profile');
    }
    const appContainerUrl = joinPathParts([params.pod, params.path, '/']);
    const profileUrl = joinPathParts([appContainerUrl, 'profile']);
    const preferences: Preferences = { profile: profileUrl };
    await updatePreferences(preferences, state.solidProfile.preferencesFile, state.solidProfile.webId, fetch);
    commit(SET_APP_CONTAINER_URL_MUTATION, appContainerUrl);
    commit(SET_INITIAL_FETCH_RUNNING_MUTATION);
    try {
      await Promise.all([dispatch(FETCH_PROFILE_ACTION), dispatch(FETCH_OWN_REVIEWS_ACTION)]);
      if (params.publicReadAccess) {
        try {
          await dispatch(SET_PUBLIC_READ_ACCESS_ACTION, {
            publicReadAccess: params.publicReadAccess,
            notifyConnectNode: params.publicReadAccess,
          });
        } catch (err) {
          await showErrorToast((err as Error).message);
        }
      }
    } finally {
      commit(SET_INITIAL_FETCH_COMPLETE_MUTATION);
    }
  },
  async [FETCH_PREFERENCES_ACTION]({ commit, state }) {
    if (!state.solidProfile) {
      throw new Error('Fetching preferences not possible, no Solid profile');
    }
    if (!state.solidProfile.preferencesFile) {
      throw new Error('Fetching preferences not possible, no preferences file link in Solid profile');
    }
    const prefs = await getPreferences(state.solidProfile.preferencesFile, state.solidProfile.webId, fetch);
    if (prefs.profile && prefs.profile.endsWith('/profile')) {
      const appContainerUrl = prefs.profile.slice(0, -'profile'.length);
      commit(SET_APP_CONTAINER_URL_MUTATION, appContainerUrl);
    }
  },
  async [FETCH_PUBLIC_READ_ACCESS_ACTION]({ commit, state }) {
    if (!state.appContainerUrl) {
      throw new Error('Fetching public read access not possible, app container URL not known');
    }
    try {
      const readAccess = await getPublicReadAccess(state.appContainerUrl, fetch);
      commit(SET_PUBLIC_READ_ACCESS_MUTATION, readAccess);
    } catch (err) {
      commit(SET_PUBLIC_READ_ACCESS_MUTATION, false);
      throw err;
    }
  },
  async [FETCH_PROFILE_ACTION]({ commit, state }) {
    if (!state.solidProfile) {
      throw new Error('Fetching Solidelight profile not possible, no Solid profile available');
    }
    if (!state.appContainerUrl) {
      throw new Error('Fetching Solidelight profile not possible, app container URL not known');
    }
    const profile = await getProfile(
      state.appContainerUrl,
      buildDefaultProfile(state.appContainerUrl, state.solidProfile.webId),
      fetch,
    );
    commit(SET_PUBLIC_READ_ACCESS_MUTATION, profile);
  },
  async [SET_PUBLIC_READ_ACCESS_ACTION](
    { commit, state },
    params: { publicReadAccess: boolean; notifyConnectNode: boolean },
  ) {
    if (!state.solidProfile) {
      throw new Error('Changing Solidelight profile visibility not possible, no Solid profile available');
    }
    if (!state.appContainerUrl) {
      throw new Error('Changing Solidelight profile visibility not possible, app container URL not known');
    }
    if (state.publicReadAccess === params.publicReadAccess) {
      return;
    }
    try {
      await setPublicReadAccess(params.publicReadAccess, state.appContainerUrl, state.solidProfile.webId, fetch);
    } catch (e) {
      throw new Error('Setting public read access failed, please grant control permissions to Solidelight.');
    }
    if (params.notifyConnectNode) {
      if (params.publicReadAccess) {
        await sendJoinMessageToConnectNode(state.appContainerUrl, state.solidProfile.webId, fetch);
      } else {
        await sendLeaveMessageToConnectNode(state.appContainerUrl, state.solidProfile.webId, fetch);
      }
    }
    commit(SET_PUBLIC_READ_ACCESS_MUTATION, params.publicReadAccess);
  },
  async [DELETE_DATA_ACTION]({ dispatch, state }) {
    if (!state.solidProfile) {
      throw new Error('Deleting Solidelight data not possible, no Solid profile available');
    }
    if (!state.solidProfile.preferencesFile) {
      throw new Error('Deleting Solidelight data not possible, preferences file URL not known');
    }
    if (!state.appContainerUrl) {
      throw new Error('Deleting Solidelight data not possible, app container URL not known');
    }
    if (state.publicReadAccess) {
      await sendLeaveMessageToConnectNode(state.appContainerUrl, state.solidProfile.webId, fetch);
    }
    await deleteData(state.appContainerUrl, state.solidProfile.preferencesFile, state.solidProfile.webId, fetch);
    await dispatch(LOGOUT_ACTION);
  },
  async [GEOLOCATE_ACTION]({ commit }) {
    try {
      const position = await getCurrentPosition(GEOLOCATION_POSITION_PARAMS);
      commit(SET_GEOLOCATION_POSITION_MUTATION, position);
    } catch {
      commit(SET_GEOLOCATION_UNAVAILABLE_MUTATION);
    }
  },
  async [START_WATCHING_GEOLOCATION_POSITION_ACTION]({ commit, state }) {
    if (state.geolocationWatchId === null) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => commit(SET_GEOLOCATION_POSITION_MUTATION, position),
        () => commit(SET_GEOLOCATION_UNAVAILABLE_MUTATION),
        GEOLOCATION_POSITION_PARAMS,
      );
      commit(SET_GEOLOCATION_WATCH_ID_MUTATION, watchId);
    }
  },
  async [STOP_WATCHING_GEOLOCATION_POSITION_ACTION]({ commit, state }) {
    if (state.geolocationWatchId !== null) {
      stopWatchingPosition(state.geolocationWatchId);
      commit(UNSET_GEOLOCATION_WATCH_ID_MUTATION);
    }
  },
  async [LOGOUT_ACTION]({ dispatch, commit, state }) {
    await logout();
    if (state.geolocationWatchId !== null) {
      await dispatch(STOP_WATCHING_GEOLOCATION_POSITION_ACTION);
    }
    commit(CLEAR_USER_STATE_MUTATION);
    commit(CLEAR_RECOMMEND_STATE_MUTATION);
  },
};
