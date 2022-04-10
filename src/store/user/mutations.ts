import { ISessionInfo } from '@inrupt/solid-client-authn-browser';
import { MutationTree } from 'vuex';

import { UserProgress } from '@/model/UserProgress';
import { ColorScheme } from '@/utils/app/colorScheme/ColorScheme';
import { SolidProfile } from '@/utils/solid/SolidProfile';

import { DEFAULT_STATE, State } from './state';

export const SET_COLOR_SCHEME_MUTATION = 'setColorScheme';
export const SET_EXPLAIN_SUGGESTIONS_MUTATION = 'setExplainSuggestions';
export const SET_HAS_SEEN_INTRO_MUTATION = 'setHasSeenIntro';
export const SET_IDENTITY_PROVIDER_MUTATION = 'setIdentityProvider';
export const SET_SESSION_INFO_MUTATION = 'setSessionInfo';
export const SET_INITIAL_FETCH_RUNNING_MUTATION = 'setInitialFetchRunning';
export const SET_INITIAL_FETCH_COMPLETE_MUTATION = 'setInitialFetchComplete';
export const SET_APP_CONTAINER_URL_MUTATION = 'setAppContainerUrl';
export const SET_GEOLOCATION_WATCH_ID_MUTATION = 'setGeolocationWatchId';
export const UNSET_GEOLOCATION_WATCH_ID_MUTATION = 'unsetGeolocationWatchId';
export const SET_GEOLOCATION_UNAVAILABLE_MUTATION = 'setGeolocationUnavailable';
export const SET_GEOLOCATION_POSITION_MUTATION = 'setGeolocationPosition';
export const CLEAR_USER_STATE_MUTATION = 'clearUserState';
export const SET_SOLID_PROFILE_MUTATION = 'setSolidProfile';
export const SET_PUBLIC_READ_ACCESS_MUTATION = 'setPublicReadAccess';

export const mutations: MutationTree<State> = {
  [SET_COLOR_SCHEME_MUTATION](state, colorScheme: ColorScheme) {
    state.colorScheme = colorScheme;
  },
  [SET_EXPLAIN_SUGGESTIONS_MUTATION](state, explainSuggestions: boolean) {
    state.explainSuggestions = explainSuggestions;
  },
  [SET_HAS_SEEN_INTRO_MUTATION](state) {
    state.userProgress = UserProgress.INTRO_SEEN;
  },
  [SET_IDENTITY_PROVIDER_MUTATION](state, identityProvider: string) {
    state.identityProvider = identityProvider;
  },
  [SET_INITIAL_FETCH_RUNNING_MUTATION](state) {
    state.initialFetchComplete = false;
  },
  [SET_INITIAL_FETCH_COMPLETE_MUTATION](state) {
    state.initialFetchComplete = true;
  },
  [SET_SESSION_INFO_MUTATION](state, sessionInfo: ISessionInfo) {
    state.userProgress = UserProgress.LOGGED_IN;
    state.sessionInfo = sessionInfo;
  },
  [SET_APP_CONTAINER_URL_MUTATION](state, url: string) {
    state.userProgress = UserProgress.APP_CONTAINER_URL_SET;
    state.appContainerUrl = url;
  },
  [SET_GEOLOCATION_WATCH_ID_MUTATION](state, watchId: number) {
    state.geolocationWatchId = watchId;
  },
  [UNSET_GEOLOCATION_WATCH_ID_MUTATION](state) {
    state.geolocationWatchId = null;
  },
  [SET_GEOLOCATION_UNAVAILABLE_MUTATION](state) {
    state.geolocationAvailable = false;
    state.geolocationPosition = null;
  },
  [SET_GEOLOCATION_POSITION_MUTATION](state, newPosition: GeolocationPosition) {
    if (
      state.geolocationPosition === null ||
      (newPosition.timestamp > state.geolocationPosition.timestamp &&
        newPosition.coords.latitude !== state.geolocationPosition.coords.latitude &&
        newPosition.coords.longitude !== state.geolocationPosition.coords.longitude)
    ) {
      state.geolocationAvailable = true;
      state.previousGeolocationPosition = state.geolocationPosition ? { ...state.geolocationPosition } : null;
      // We need a manual copy here, as we would otherwise get an empty object
      // due to GeolocationPosition only being available in secure contexts.
      state.geolocationPosition = {
        coords: {
          latitude: newPosition.coords.latitude,
          longitude: newPosition.coords.longitude,
          altitude: newPosition.coords.altitude,
          accuracy: newPosition.coords.accuracy,
          altitudeAccuracy: newPosition.coords.altitudeAccuracy,
          heading: newPosition.coords.heading,
          speed: newPosition.coords.speed,
        },
        timestamp: newPosition.timestamp,
      };
    }
  },
  [CLEAR_USER_STATE_MUTATION](state) {
    state.userProgress = Math.min(state.userProgress, UserProgress.INTRO_SEEN);
    state.sessionInfo = DEFAULT_STATE.sessionInfo;
    state.solidProfile = DEFAULT_STATE.solidProfile;
    state.appContainerUrl = DEFAULT_STATE.appContainerUrl;
    state.initialFetchComplete = DEFAULT_STATE.initialFetchComplete;
    state.profile = DEFAULT_STATE.profile;
    state.publicReadAccess = DEFAULT_STATE.publicReadAccess;
    state.geolocationAvailable = DEFAULT_STATE.geolocationAvailable;
    state.geolocationWatchId = DEFAULT_STATE.geolocationWatchId;
    state.geolocationPosition = DEFAULT_STATE.geolocationPosition;
    state.previousGeolocationPosition = DEFAULT_STATE.previousGeolocationPosition;
  },
  [SET_SOLID_PROFILE_MUTATION](state, profile: SolidProfile | null) {
    state.solidProfile = profile;
  },
  [SET_PUBLIC_READ_ACCESS_MUTATION](state, publicReadAccess: boolean) {
    state.publicReadAccess = publicReadAccess;
  },
};
