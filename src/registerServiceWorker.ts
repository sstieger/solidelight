/* eslint-disable no-console */

import { register } from 'register-service-worker';

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log('App is being served from cache by a service worker.');
    },
    registered(swRegistration) {
      console.log('Service worker has been registered.');
      // Check for an available update every hour.
      setInterval(() => swRegistration.update(), 60 * 60 * 1000);
    },
    cached() {
      console.log('Content has been cached for offline use.');
    },
    updatefound() {
      console.log('New content is downloading.');
    },
    updated(swRegistration) {
      console.log('New content is available; please refresh.');
      document.dispatchEvent(new CustomEvent('serviceWorkerUpdateAvailable', { detail: swRegistration }));
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.');
    },
    error(error) {
      console.error('Error during service worker registration:', error);
    },
  });
}
