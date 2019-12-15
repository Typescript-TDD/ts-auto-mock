import React from 'react';
import './App.css';
import {Chart} from "./Chart";
import data from '../src/result/data';

function adaptDataForChart(data) {
    return Object.keys(data).reduce(((result, branchKey) => {
        Object.keys(data[branchKey]).forEach((commitKey) => {
            Object.keys(data[branchKey][commitKey]).forEach((dateKey) => {
                result.push({
                    branch: branchKey,
                    commit: commitKey,
                    date: dateKey,
                    features: data[branchKey][commitKey][dateKey]
                });
            });
        });

        return result;
    }), []);
}

function App() {
    const dataAdapted = adaptDataForChart(data);
    const [branch, selectBranch] = React.useState('master');

    const branches = Object.keys(data).map((branchName, index) => {
        return <option key={index} value={branchName}>{branchName}</option>
    });

    const charts = dataAdapted
      .filter((feature) => feature.branch === branch)
      .map((s, index) => <div key={index}>
          <p>{s.commit}</p>
          <p>{s.date}</p>
          <Chart data={s.features} />
        </div>
          );
    return (
      <div className="App">
          <div className='select-container'>
              <select className='select-css' defaultValue="None" onChange={(event) => selectBranch(event.target.value)}>
                  <option value="None" disabled>None</option>
                  {branches}
              </select>
          </div>

          <header className="App-header">
              {charts}
          </header>
      </div>

    );
}

export default App;
