// Solid client name, as sent to the identity provider.
export const SOLID_CLIENT_NAME = 'Solidelight';

// App store name, has to be alphanumeric, but can contain underscores (see
// localForage's config documentation, localForage is used by @ionic/storage).
export const PERSISTENT_APP_STORE_NAME = 'Solidelight';

export const PATH_BEFORE_AUTH_REDIRECT_STORAGE_KEY = 'pathBeforeRedirect';
export const PATHS_EXCLUDED_FROM_BACKUP_BEFORE_AUTH_REDIRECT = ['/', '/intro', '/login'];

export const INTRO_PAGE_PATH = '/intro';
export const LOGIN_PAGE_PATH = '/login';
export const SETUP_PAGE_PATH = '/setup';
export const DEFAULT_PAGE_PATH = '/discover';

export const SUGGESTIONS_MAX_DISTANCE = 10000;
export const NUM_SUGGESTIONS = 20;

export const GEOLOCATION_POSITION_PARAMS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
