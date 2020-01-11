import React from 'react';
import {
  Bar, BarChart, Legend, Tooltip, XAxis, YAxis,
} from 'recharts';
import { PerformanceData } from '../performanceService/performanceService';

export interface PerformanceChartProps {
  data: PerformanceData[];
}

interface PerformanceChartData {
  name: string[];
  total_time: string;
}
export function PerformanceChart(props: PerformanceChartProps): JSX.Element {
  const data: PerformanceChartData[] = props.data.map((feature: PerformanceData) => {
    return {
      name: feature.types,
      total_time: feature.result.total_time.value,
    };
  });

  return (
    <BarChart
      width={1000}
      height={300}
      data={data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <XAxis dataKey='name'/>
      <YAxis/>
      <Tooltip/>
      <Legend/>
      <Bar dataKey='total_time' fill='#8884d8'/>
    </BarChart>
  );
}
