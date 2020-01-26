import React from 'react';
import { PerformanceData } from '../performanceService/performanceService';
import { ResponsiveBar } from '@nivo/bar'

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
      total_time: parseFloat(feature.result.total_time.value),
    };
  });

    return <ResponsiveBar
      data={data}
      keys={[ 'total_time' ]}
      indexBy="name"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      colors={['#1fb6ff']}
      theme={{
        axis: {
          ticks: {
            text: {
              fontSize: '12px',
              fill:"#FFFFFF"
            }
          },
          legend: {
            text: {
              fill: "#FFFFFF",
              fontSize: '14px',
            }
          }
        },
      }}
      axisBottom={{
        tickPadding: 5,
        tickRotation: 0,
        legendOffset: 32
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'seconds',
        legendPosition: 'middle',
        legendOffset: -40
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      enableGridY={false}
      borderRadius={2}
      labelTextColor="white"
      isInteractive={false}
    />
}
