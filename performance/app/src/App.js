import React, {useEffect} from 'react';
import './App.css';
import {Chart} from "./Chart";
const performanceRepository = require("./repository/repository");

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
    }), []).sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    })
}

function App() {
    const [branch, selectBranch] = React.useState('master');
    const [data, setData] = React.useState([]);
    const [branchNames, setBranches] = React.useState([]);

    useEffect(() => {
        performanceRepository("https://api.jsonbin.io/b/5e0ccffff9369177b27624ce").get().then((result) => {
            const dataAdapted = adaptDataForChart(result.data['performance-tests']);
            const branches = result.data['performance-tests'];

            setData(dataAdapted);
            setBranches(branches);
        });
    }, []);

    const branches = Object.keys(branchNames).map((branchName, index) => {
        return <option key={index} value={branchName}>{branchName}</option>
    });

    const charts = data
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
