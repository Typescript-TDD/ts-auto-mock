import React, { useEffect, useState } from 'react';
import '../input/input.scss';
import './definitelyTyped.scss';
import { DefinitelyTypedFilters, DefinitelyTypedFiltersOptions } from './filters/definitelyTypedFilters';

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
  const [filterOptions, setFilterOptions] = useState({
    isShowingSuccesses: false,
    isShowingWarnings: true,
    isShowingErrors: true
  } as DefinitelyTypedFiltersOptions);

  useEffect(() => {
    fetch('resources/definitelyTyped/list.json').then(r => r.json()).then((result: RunDataId[]) => {
      setRuns(result.map(r => ({date: new Date(r.date), id: r.id})));

      if (result && result.length) {
        setRun(result[result.length - 1].id);
      }
    });
  }, []);

  useEffect(() => {
    processFilter();
  }, [filterOptions, data]);

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
        return a.response === DefinitelyTypedRunResponse.Error ? -1 : a.response === DefinitelyTypedRunResponse.Success ? 1 : 0;
      });

      setData(dataToSet);
    });
  }, [run]);

  function processFilter() {
    let temporaryData: DefinitelyTypedTypeRun[] = data;

    if (filterOptions.filterOut) {
      temporaryData = temporaryData.filter(d => {
        return !(filterOptions.filterOut!.test(d.message || ''));
      });
    }

    if (filterOptions.filterIn) {
      temporaryData = temporaryData.filter(d => {
        return filterOptions.filterIn!.test(d.message || '');
      });
    }

    if (!filterOptions.isShowingSuccesses) {
      temporaryData = temporaryData.filter(d => {
        return d.response !== DefinitelyTypedRunResponse.Success;
      });
    }

    if (!filterOptions.isShowingWarnings) {
      temporaryData = temporaryData.filter(d => {
        return d.response !== DefinitelyTypedRunResponse.Warning;
      });
    }

    if (!filterOptions.isShowingErrors) {
      temporaryData = temporaryData.filter(d => {
        return d.response !== DefinitelyTypedRunResponse.Error;
      });
    }

    setViewData(temporaryData);
  }

  const runOptions: JSX.Element[] = runs.map((run: DefinitelyTypedRun, index: number) => {
    return <option key={index} value={run.id}>{run.date.toISOString()}</option>;
  });

  const types: JSX.Element[] = !viewData ? [] : viewData.map(d => {
    return <details key={d.item} className={d.response === DefinitelyTypedRunResponse.Success ? 'success' : d.response === DefinitelyTypedRunResponse.Warning ? 'warning' : 'error'}>
      <summary><span>{d.item}</span></summary>
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

    <DefinitelyTypedFilters initialOptions={filterOptions} filter={options => setFilterOptions(options)}/>

    {/*<div className='DefinitelyTyped-filters'>*/}
    {/*  <div className='DefinitelyTyped-inputFilter'>*/}
    {/*    <p>Filter out messages (regex)</p>*/}
    {/*    <input className='Input' type='text' value={filterOut} onChange={e => setFilter(e.target.value)} />*/}
    {/*    <button onClick={() => processFilter()}>Filter</button>*/}
    {/*  </div>*/}
    {/*  <div className='DefinitelyTyped-inputFilter'>*/}
    {/*    <p>Filter in only messages (regex)</p>*/}
    {/*    <input className='Input' type='text' value={filterOut} onChange={e => setFilter(e.target.value)} />*/}
    {/*    <button onClick={() => processFilter()}>Filter</button>*/}
    {/*  </div>*/}
    {/*</div>*/}

    <div className='DefinitelyTyped-typesContainer'>
      { types }
    </div>
  </div>;
}
