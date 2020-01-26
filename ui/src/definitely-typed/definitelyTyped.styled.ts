import styled, {StyledFunction} from 'styled-components';


interface Props {
  type: string;
}

export const TypesContainer = styled.div`
  margin-top: 20px;
`;
export const TypesDetails = styled.details<Props>`
  border: 1px solid #aaa;
  border-radius: 4px;
  padding: .5em .5em 0;
  background-color: ${props => typeDetailsColours[props.type]};
  ${({type}) => handleTypesDetails(type)};
`;

export const TypesSummary = styled.summary<Props>`
  font-weight: bold;
  margin: -.5em -.5em 0;
  padding: .5em;
  cursor: pointer;
  background-color: ${props => typeDetailsColours[props.type]};
  color: white;
  ${({type}) => handleTypesSummary(type)};
`;

const TypesSummarySuccess = `
  color: transparent;
  padding: 0;

  > span {
    color: white;
  }
`;

const TypesSummaryWarningAndError = `
  pre {
    font-size: 18px;
  }

  background-color: black;
  color: #66DD66;

  &[open] {
    padding: .5em;

    summary {
      border-bottom: 1px solid #aaa;
      margin-bottom: .5em;
    }
  }
`;

const typeDetailsColours: Record<string, string> = {
  success: 'green',
  warning: '#DC8400',
  error: '#C82820',
};

function handleTypesSummary(type: string) {
  if (type === 'success') {
    return TypesSummarySuccess;
  }
}

function handleTypesDetails(type: string) {
  if (type === 'warning' || type === 'error') {
    return TypesSummaryWarningAndError;
  }
}
