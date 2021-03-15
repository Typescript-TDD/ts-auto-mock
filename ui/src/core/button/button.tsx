import React, { FC } from 'react';
import styled from 'styled-components';
import { Theme } from '../theme/theme';
import { useTheme } from '../theme/useTheme';

const ButtonStyled = styled.button<ButtonStyleProps>`
  cursor: pointer;
  margin: 3px 5px;
  border: none;
  border-radius: 3px;
  padding: 20px 30px;
  font-size: 18px;
  background: ${(props) => props.backgroundColor};
  box-shadow: inset 0 0 0 1px ${(props) => props.backgroundColor};
  color: white;
  transition: all 0.3s;

  &:hover {
    box-shadow: inset 0 0 0 1000px ${(props) => props.backgroundColor};
    color: white;
  }
`;

const ThemeColour = {
  [Theme.DARK]: '#1FB6FF',
  [Theme.LIGHT]: '#0b5fff',
};

interface ButtonStyleProps {
  backgroundColor: string;
}

export const Button: FC = ({ children }) => {
  const theme = useTheme();

  return (
    <ButtonStyled backgroundColor={ThemeColour[theme]}>{children}</ButtonStyled>
  );
};
