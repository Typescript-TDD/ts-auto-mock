import React, { useEffect, useState } from 'react';
import { PerformanceChart } from './chart/chart';
import { PerformanceChartBlockContainer, PerformanceChartContainer, PerformanceSelect } from './performance.styled';
import { IPerformanceService, PerformanceData, PerformanceListData, PerformanceService } from './performanceService/performanceService';
import { Option } from '../style/select/select.styled';

interface PerformanceChartData {
  branch: string;
  commit: string;
  date: string;
  features: PerformanceData[];
}

function adaptDataForChart(data: PerformanceListData): PerformanceChartData[] {
  return Object.keys(data)
    .reduce(((result: PerformanceChartData[], branchKey: string): PerformanceChartData[] => {
      Object.keys(data[branchKey]).forEach((commitKey: string) => {
        Object.keys(data[branchKey][commitKey]).forEach((dateKey: string) => {
          result.push({
            branch: branchKey,
            commit: commitKey,
            date: dateKey,
            features: data[branchKey][commitKey][dateKey],
          });
        });
      });

      return result;
    }), []).sort((a: PerformanceChartData, b: PerformanceChartData) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

export function Performance(): JSX.Element {
  const [data, setData] = useState([] as PerformanceChartData[]);
  const [branch, setBranch] = useState('master');
  const [branches, setBranches] = useState({} as PerformanceListData);
  // @ts-ignore
  const performanceService: IPerformanceService = PerformanceService(process.env.PERFORMANCE_DATA_URL);

  useEffect(() => {
    performanceService.get().then((result: PerformanceListData) => {
      const adaptedData: PerformanceChartData[] = adaptDataForChart(result);

      setBranches(result);
      setData(adaptedData);
    });
  }, []);

  const branchesOptions: JSX.Element[] = Object.keys(branches).map((branchName: string, index: number) => {
    return <Option key={index} value={branchName}>{branchName}</Option>;
  });

  const charts: JSX.Element[] = data
    .filter((feature: PerformanceChartData) => feature.branch === branch)
    .map((feature: PerformanceChartData, index: number) =>
        <PerformanceChartBlockContainer key={index}>
          <span>{feature.commit}</span>
          <span>{feature.date}</span>
          <PerformanceChartContainer>
            <PerformanceChart data={feature.features}/>
          </PerformanceChartContainer>
        </PerformanceChartBlockContainer>,
    );

  return <div>
    <PerformanceSelect defaltValue='master' onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setBranch(event.target.value)}>
        {branchesOptions}
    </PerformanceSelect>

    { charts }
  </div>;
}
