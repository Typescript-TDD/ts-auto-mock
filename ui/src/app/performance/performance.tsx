import React, { useEffect, useState } from 'react';
import '../select/select.scss';
import { PerformanceChart } from './chart/chart';
import './performance.scss';
import { IPerformanceService, PerformanceData, PerformanceListData, PerformanceService } from './performanceService/performanceService';

interface PerformanceGraphData {
  branch: string;
  commit: string;
  date: string;
  features: PerformanceData[];
}

function adaptDataForChart(data: PerformanceListData): PerformanceGraphData[] {
  return Object.keys(data)
    .reduce(((result: PerformanceGraphData[], branchKey: string): PerformanceGraphData[] => {
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
  }), []).sort((a: PerformanceGraphData, b: PerformanceGraphData) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function Performance(): JSX.Element {
  const [data, setData] = useState([] as PerformanceGraphData[]);
  const [branch, setBranch] = useState('master');
  const [branches, setBranches] = useState({} as PerformanceListData);
  // @ts-ignore
  const performanceService: IPerformanceService = PerformanceService(process.env.PERFORMANCE_DATA_URL);

  useEffect(() => {
    performanceService.get().then((result: PerformanceListData) => {
      const adaptedData: PerformanceGraphData[] = adaptDataForChart(result);

      setBranches(result);
      setData(adaptedData);
    });
  }, []);

  const branchesOptions: JSX.Element[] = Object.keys(branches).map((branchName: string, index: number) => {
    return <option key={index} value={branchName}>{branchName}</option>;
  });

  const charts: JSX.Element[] = data
    .filter((feature: PerformanceGraphData) => feature.branch === branch)
    .map((feature: PerformanceGraphData, index: number) => <div className='Performance-graph' key={index}>
        <p>{feature.commit}</p>
        <p>{feature.date}</p>
        <PerformanceChart data={feature.features}/>
      </div>,
    );

  return <div className='Performance-container'>
      <div className='Performance-select'>
        <select className='Select' defaultValue='None' onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setBranch(event.target.value)}>
          <option value='None' disabled>None</option>
          {branchesOptions}
        </select>
      </div>

      <div className='Performance-graphContainer'>
        { charts }

      </div>
    </div>;
}
