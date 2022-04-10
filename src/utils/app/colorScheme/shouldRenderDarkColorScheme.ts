import { ColorScheme } from './ColorScheme';
import { prefersDarkColorScheme } from './prefersDarkColorScheme';

export function shouldRenderDarkColorScheme(theme: ColorScheme): boolean {
  switch (theme) {
    case ColorScheme.DARK:
      return true;
    case ColorScheme.LIGHT:
      return false;
    case ColorScheme.SYSTEM:
      return prefersDarkColorScheme();
  }
}
