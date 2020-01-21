import { useConfig } from 'docz';
import React from 'react';
import { TsAutoMockCopy } from '../../copy/copy';
import { Theme } from '../../core/theme/theme';
import { useTheme } from '../../core/theme/useTheme';
import { Centered } from '../../style/view/centered/centered.styled';
import { HomeFooterSlackLink } from './home-footer.styled';
// @ts-ignore
import slack from './slack_small.png';
const slackLink = "https://join.slack.com/t/typescripttdd/shared_invite/enQtODk3MjQwNzUwNTk2LTMzNjdlZTNmMmY3Nzg2NDNiZDA1YzJmZjk2NjcwZjQwODQ3YzE5NGZjM2Q4MzZjYWNiMWE4MGU0NjEzM2E5YzE";

const ThemeColour = {
  [Theme.DARK]: 'white',
  [Theme.LIGHT]: '#0b5fff'
};

export function HomeFooter() {
  const theme = useTheme();

  return <Centered>
    <img src={slack} alt={'slack link'}/>
    <HomeFooterSlackLink color={ThemeColour[theme]} href={slackLink}>
      {TsAutoMockCopy.slack}
    </HomeFooterSlackLink>
  </Centered>;
}
