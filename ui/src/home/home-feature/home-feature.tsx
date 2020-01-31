import React from 'react';
import { TsAutoMockCopy } from '../../copy/copy';
import { Column } from '../../style/view/column/column.styled';
import { HomeFeatureColumn, HomeFeatureColumnContainer } from './home-feature.styled';

export function HomeFeature() {
  return <>
    <HomeFeatureColumnContainer>
      <HomeFeatureColumn>
        <h3>{TsAutoMockCopy.features.real.title}</h3>
        <p>{TsAutoMockCopy.features.real.description}</p>
      </HomeFeatureColumn>

      <HomeFeatureColumn>
        <h3>{TsAutoMockCopy.features.extendible.title}</h3>
        <p>{TsAutoMockCopy.features.extendible.description}</p>
      </HomeFeatureColumn>

      <HomeFeatureColumn>
        <h3>{TsAutoMockCopy.features.typeSafety.title}</h3>
        <p>{TsAutoMockCopy.features.typeSafety.description}</p>
      </HomeFeatureColumn>
    </HomeFeatureColumnContainer>
    </>
}
