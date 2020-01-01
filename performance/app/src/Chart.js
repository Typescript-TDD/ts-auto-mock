import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
} from 'recharts';

export function Chart(props) {
    const data = props.data.map((feature) => {
        return {
            name: feature.types,
            total_time: feature.result.total_time.value,
        }
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
          <XAxis dataKey="name"/>
          <YAxis/>
          <Tooltip/>
          <Legend/>
          <Bar dataKey="total_time" fill="#8884d8"/>
      </BarChart>
    );
}
