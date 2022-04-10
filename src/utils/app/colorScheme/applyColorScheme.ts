import { ColorScheme } from './ColorScheme';
import { shouldRenderDarkColorScheme } from './shouldRenderDarkColorScheme';

export function applyColorScheme(colorScheme: ColorScheme): void {
  document.body.classList.toggle('dark', shouldRenderDarkColorScheme(colorScheme));
}
