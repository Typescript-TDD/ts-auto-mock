import { useConfig } from 'docz';
import React from 'react';
import { useTheme } from '../../core/theme/useTheme';
import { Centered } from '../../style/view/centered/centered.styled';
import { HomeFooterSlackLink } from './home-footer.styled';
// @ts-ignore
import slack from './slack_small.png';
const slackLink = "https://join.slack.com/t/typescripttdd/shared_invite/enQtODk3MjQwNzUwNTk2LTMzNjdlZTNmMmY3Nzg2NDNiZDA1YzJmZjk2NjcwZjQwODQ3YzE5NGZjM2Q4MzZjYWNiMWE4MGU0NjEzM2E5YzE";

export function HomeFooter() {
  const theme = useTheme();

  return <Centered>
    <img src={slack}/>
    <HomeFooterSlackLink href={slackLink}>
      Need help? Join us on Slack
    </HomeFooterSlackLink>
  </Centered>;
}
