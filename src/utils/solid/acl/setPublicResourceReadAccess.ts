import {
  SolidDataset,
  WithAcl,
  WithServerResourceInfo,
  createAcl,
  getResourceAcl,
  hasAccessibleAcl,
  hasResourceAcl,
  saveAclFor,
  setAgentResourceAccess,
  setPublicResourceAccess,
} from '@inrupt/solid-client';

import { FetchFn } from '@/utils/solid/FetchFn';

export async function setPublicResourceReadAccess(
  dataset: SolidDataset & WithServerResourceInfo & WithAcl,
  allowed: boolean,
  webId: string,
  fetch: FetchFn,
): Promise<void> {
  if (!hasAccessibleAcl(dataset)) {
    throw new Error('Can not update public read access, ACL not accessible');
  }
  const aclDataset = hasResourceAcl(dataset) ? getResourceAcl(dataset) : createAcl(dataset);
  const publicAccess = {
    read: allowed,
    write: false,
    append: false,
    control: false,
  };
  const userAccess = {
    read: true,
    write: true,
    append: true,
    control: true,
  };
  const updatedAclDataset = setAgentResourceAccess(
    setPublicResourceAccess(aclDataset, publicAccess),
    webId,
    userAccess,
  );
  await saveAclFor(dataset, updatedAclDataset, { fetch });
}
