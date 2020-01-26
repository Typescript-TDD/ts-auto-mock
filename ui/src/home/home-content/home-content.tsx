import { Link } from 'docz';
import React from 'react';
import { TsAutoMockCopy } from '../../copy/copy';
import { Button } from '../../core/button/button';
import { TextSubHeader } from '../../style/text/sub-header/sub-header.style';
import { Centered } from '../../style/view/centered/centered.styled';
import { CenteredRow } from '../../style/view/row/centered.row.styled';
import { HomeContentContainer } from './home-content.styled';

export function HomeContent() {
  return <>
    <HomeContentContainer>
      <CenteredRow>
        <TextSubHeader>{TsAutoMockCopy.title}</TextSubHeader>
        <Centered>
          <Link to='/installation' >
            <Button>{TsAutoMockCopy.homeButton}</Button>
          </Link>
          <Link to='/create-mock' >
            <Button>{TsAutoMockCopy.apiButton}</Button>
          </Link>
        </Centered>
      </CenteredRow>
    </HomeContentContainer>
  </>
}
