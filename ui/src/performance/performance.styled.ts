import styled from 'styled-components';
import { Select } from '../style/select/select.styled';

export const PerformanceChartBlockContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
`;

export const PerformanceGraph = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
`;

export const PerformanceSelect = styled(Select)`
  width: 400px;
  margin: 0 auto 20px auto;
`;

export const PerformanceChartContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  height: 400px;
`;
