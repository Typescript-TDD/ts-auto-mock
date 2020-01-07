import React, { useEffect, useState } from 'react';
import './definitelyTyped.scss';
import '../input/input.scss';

enum DefinitelyTypedRunResponse {
  Error,
  Warning,
  Success
}

interface DefinitelyTypedTypeRun {
  item: string;
  response: DefinitelyTypedRunResponse;
  message?: string;
}

interface DefinitelyTypedRun {
  id: string;
  date: Date;
}

interface RunDataId {
  id: string;
  date: string;
}

type RunData = TypeRunData[];

interface TypeRunData {
  item: string;
  response: string;
  message?: string;
}

export function DefinitelyTyped(): JSX.Element {
  const [data, setData] = useState([] as DefinitelyTypedTypeRun[]);
  const [viewData, setViewData] = useState([] as DefinitelyTypedTypeRun[]);
  const [run, setRun] = useState('None');
  const [runs, setRuns] = useState([] as DefinitelyTypedRun[]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('resources/definitelyTyped/list.json').then(r => r.json()).then((result: RunDataId[]) => {
      setRuns(result.map(r => ({date: new Date(r.date), id: r.id})));

      if (result && result.length) {
        setRun(result[result.length - 1].id);
      }
    });
  }, []);

  useEffect(() => {
    if (run === 'None') {
      return;
    }

    fetch('resources/definitelyTyped/' + run).then(r => r.json()).then((result: RunData) => {
      const dataToSet: DefinitelyTypedTypeRun[] = result.map(r => {
        return {
          item: r.item,
          message: r.message,
          response: r.response === 'error' ? DefinitelyTypedRunResponse.Error : r.response === 'warning' ? DefinitelyTypedRunResponse.Warning : DefinitelyTypedRunResponse.Success
        };
      });

      dataToSet.sort((a: DefinitelyTypedTypeRun, b: DefinitelyTypedTypeRun) => {
        return a.response === DefinitelyTypedRunResponse.Error ? 0 : 1;
      });

      setData(dataToSet);
      setViewData(dataToSet);
    });
  }, [run]);

  function processFilter() {
    if (!filter) {
      setViewData(data);
    } else {
      setViewData(data.filter(d => {
        return !(new RegExp(filter).test(d.message || ''));
      }));
    }
  }

  const runOptions: JSX.Element[] = runs.map((run: DefinitelyTypedRun, index: number) => {
    return <option key={index} value={run.id}>{run.date.toISOString()}</option>;
  });

  const types: JSX.Element[] = !viewData ? [] : viewData.map(d => {
    return <details key={d.item} className={d.response === DefinitelyTypedRunResponse.Success ? 'success' : d.response === DefinitelyTypedRunResponse.Warning ? 'warning' : 'error'}>
      <summary>{d.item}</summary>
      {d.message}
    </details>;
  });

  return <div className='DefinitelyTyped-container'>
    <div className='DefinitelyTyped-select'>
      <select className='Select' value={run} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setRun(event.target.value)}>
        <option value='None' disabled>None</option>
        {runOptions}
      </select>
    </div>

    <div className='DefinitelyTyped-filter'>
      <p>Filter out messages with matching regex</p>
      <input className='Input' type='text' value={filter} onChange={e => setFilter(e.target.value)} />
      <button onClick={() => processFilter()}>Filter</button>
    </div>

    <div className='DefinitelyTyped-typesContainer'>
      { types }
    </div>
  </div>;
}
