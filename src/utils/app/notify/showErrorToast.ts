import { toastController } from '@ionic/vue';

export async function showErrorToast(message: string) {
  const toast = await toastController.create({ message, duration: 2000 });
  toast.present();
}
