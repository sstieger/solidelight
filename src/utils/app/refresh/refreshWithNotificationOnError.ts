import { RefresherCustomEvent } from '@ionic/vue';

import { showErrorToast } from '@/utils/app/notify/showErrorToast';

export async function refreshWithNotificationOnError(
  event: RefresherCustomEvent,
  refreshAction: () => Promise<void>,
): Promise<void> {
  try {
    await refreshAction();
  } catch {
    await showErrorToast('Refreshing failed, please check your connection.');
  } finally {
    event.target.complete();
  }
}
