export function joinPathParts(parts: string[]): string {
  return parts.reduce((path, part) => joinTwoPathPartsWithSlashIfRequired(path, part), '');
}

function joinTwoPathPartsWithSlashIfRequired(partA: string, partB: string): string {
  if (partA === '') {
    return partB;
  }
  if (partA.endsWith('/') && partB.startsWith('/')) {
    return `${partA.slice(0, -1)}${partB}`;
  }
  if (partA.endsWith('/') || partB.startsWith('/')) {
    return `${partA}${partB}`;
  }
  return `${partA}/${partB}`;
}
