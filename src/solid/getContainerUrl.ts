import { joinPathParts } from '@/utils/path/joinPathParts';

export function getContainerUrl(podUrl: string): string {
  return joinPathParts([podUrl, 'solidelight/']);
}
