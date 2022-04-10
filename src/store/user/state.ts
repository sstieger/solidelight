import { ISessionInfo } from '@inrupt/solid-client-authn-browser';

import config from '@/config';
import { Profile } from '@/model/Profile';
import { UserProgress } from '@/model/UserProgress';
import { ColorScheme } from '@/utils/app/colorScheme/ColorScheme';
import { SolidProfile } from '@/utils/solid/SolidProfile';

export interface State {
  colorScheme: ColorScheme;
  explainSuggestions: boolean;
  userProgress: UserProgress;
  identityProvider: string;
  sessionInfo: ISessionInfo | null;
  solidProfile: SolidProfile | null;
  appContainerUrl: string | null;
  initialFetchComplete: boolean;
  profile: Profile | null;
  publicReadAccess: boolean | null;
  geolocationAvailable: boolean;
  geolocationWatchId: number | null;
  geolocationPosition: GeolocationPosition | null;
  previousGeolocationPosition: GeolocationPosition | null;
}

export interface PersistentState {
  colorScheme: ColorScheme;
  explainSuggestions: boolean;
  userProgress: UserProgress;
  identityProvider: string;
  sessionInfo: ISessionInfo | null;
  solidProfile: SolidProfile | null;
  appContainerUrl: string | null;
  profile: Profile | null;
  publicReadAccess: boolean | null;
  geolocationAvailable: boolean;
  geolocationPosition: GeolocationPosition | null;
  previousGeolocationPosition: GeolocationPosition | null;
}

export function reduceStateToPersistentState(state: State): PersistentState {
  return {
    colorScheme: state.colorScheme,
    explainSuggestions: state.explainSuggestions,
    userProgress: state.userProgress,
    identityProvider: state.identityProvider,
    sessionInfo: state.sessionInfo,
    solidProfile: state.solidProfile,
    appContainerUrl: state.appContainerUrl,
    profile: state.profile,
    publicReadAccess: state.publicReadAccess,
    geolocationAvailable: state.geolocationAvailable,
    geolocationPosition: state.geolocationPosition,
    previousGeolocationPosition: state.previousGeolocationPosition,
  };
}

export const DEFAULT_STATE: State = {
  colorScheme: ColorScheme.SYSTEM,
  explainSuggestions: true,
  userProgress: UserProgress.NONE,
  identityProvider: config.defaultIdentityProviderUrl,
  sessionInfo: null,
  solidProfile: null,
  appContainerUrl: null,
  initialFetchComplete: false,
  profile: null,
  publicReadAccess: null,
  geolocationAvailable: false,
  geolocationWatchId: null,
  geolocationPosition: null,
  previousGeolocationPosition: null,
};
