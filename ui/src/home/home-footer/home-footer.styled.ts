import styled from "styled-components";
import { Theme } from '../../core/theme/theme';

interface HomeFooterSlackLinkProps {
  color: string;
}

export const HomeFooterSlackLink = styled.a<HomeFooterSlackLinkProps>`
  margin-left: 10px;
  color: ${props => props.color};
`;
