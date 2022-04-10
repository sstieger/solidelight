import { ISessionInfo, getDefaultSession, handleIncomingRedirect } from '@inrupt/solid-client-authn-browser';
import { Storage } from '@ionic/storage';

export async function silentAuth(
  storage: Storage,
  pathBeforeRedirectStorageKey: string,
  pathsExcludedFromBackupBeforeRedirect: string[],
  defaultPath: string,
): Promise<ISessionInfo | null> {
  const backedUpPath = await storage.get(pathBeforeRedirectStorageKey);
  const currentPath = window.location.pathname;
  if (!backedUpPath && pathsExcludedFromBackupBeforeRedirect.every((p) => currentPath !== p)) {
    await storage.set(pathBeforeRedirectStorageKey, currentPath);
  }
  // TODO: only try to restore the session if the user has been logged in at
  // least once with the stored identity provider. Otherwise we may get an
  // infinite redirect loop as the user is redirect to the identity provider
  // after manually returning to the app without logging in.
  await handleIncomingRedirect({ restorePreviousSession: true });
  const session = getDefaultSession();
  if (session.info.isLoggedIn) {
    window.history.replaceState(null, '', backedUpPath ? backedUpPath : defaultPath);
  }
  if (backedUpPath) {
    await storage.remove(pathBeforeRedirectStorageKey);
  }
  return session.info.isLoggedIn ? session.info : null;
}
