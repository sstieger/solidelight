import { prefersDarkColorSchemeMediaQueryList } from './prefersDarkColorSchemeMediaQueryList';

export function prefersDarkColorScheme(): boolean {
  return prefersDarkColorSchemeMediaQueryList.matches;
}
