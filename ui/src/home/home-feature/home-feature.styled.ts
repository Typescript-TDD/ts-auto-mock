import styled from "styled-components";

export const HomeFeatureColumn = styled.div`
  flex-grow: 1;     
 
  @media (min-width: 768px) {
    &:not(:first-child) {
      margin-left: 40px;
    }
  }
`;

export const HomeFeatureColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (min-width: 768px) {
    flex-direction: row;   
  }
`;
