import { login as solidLogin } from '@inrupt/solid-client-authn-browser';

import config from '@/config';
import { SOLID_CLIENT_NAME } from '@/constants';

export async function login(identityProvider: string): Promise<void> {
  await solidLogin({
    clientName: SOLID_CLIENT_NAME,
    oidcIssuer: identityProvider,
    redirectUrl: config.appUrl,
  });
}
