import {
  SolidDataset,
  WithAcl,
  WithServerResourceInfo,
  getFallbackAcl,
  getPublicResourceAccess,
  getResourceAcl,
  hasAccessibleAcl,
  hasFallbackAcl,
  hasResourceAcl,
} from '@inrupt/solid-client';

export function getPublicResourceReadAccess(dataset: SolidDataset & WithServerResourceInfo & WithAcl): boolean {
  if (!hasAccessibleAcl(dataset)) {
    throw new Error('Can not determine public access, ACL not accessible');
  }
  if (hasResourceAcl(dataset)) {
    return getPublicResourceAccess(getResourceAcl(dataset)).read;
  } else if (hasFallbackAcl(dataset)) {
    return getPublicResourceAccess(getFallbackAcl(dataset)).read;
  } else {
    throw new Error('Can not determine public read access');
  }
}
