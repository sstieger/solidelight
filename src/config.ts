import jsonConfig from '@/../config/config.json';

export interface Config {
  appUrl: string;
  defaultIdentityProviderUrl: string;
  defaultConnectNodeInboxUrl: string;
  defaultConnectNodeIndexUrl: string;
  hereApiKey: string;
}

const config: Config = jsonConfig;

export default config;
