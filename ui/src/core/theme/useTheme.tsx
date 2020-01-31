import { useColorMode } from 'theme-ui';
import { Theme } from './theme';

export function useTheme(): Theme {
  const [colorMode, setColorMode] = useColorMode();
  return colorMode;
}
