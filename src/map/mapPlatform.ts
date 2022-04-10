import H from '@here/maps-api-for-javascript';

import config from '@/config';

export const mapPlatform = new H.service.Platform({
  apikey: config.hereApiKey,
});
