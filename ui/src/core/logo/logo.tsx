import React from 'react';
import { Theme } from '../theme/theme';
import { useTheme } from '../theme/useTheme';

// @ts-ignore
import logoLight from './logo_light.svg';
// @ts-ignore
import logoDark from './logo_dark.svg';

export function Logo(): JSX.Element {
  const theme = useTheme();
  const logo = theme === Theme.LIGHT ? logoLight : logoDark;
  return <img src={logo} alt={"ts auto mock logo"}/>
}
