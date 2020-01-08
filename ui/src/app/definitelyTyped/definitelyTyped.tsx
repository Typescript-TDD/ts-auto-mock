import React, { useEffect, useState } from 'react';
import '../input/input.scss';
import './definitelyTyped.scss';
import { browserFileReader } from '../data/browserFileReader';
import {
  DefinitelyTypedFilters,
  DefinitelyTypedFiltersOptions,
  DefinitelyTypedRunInfo,
} from './filters/definitelyTypedFilters';
import {
  dataFileSystemReader,
  DataReader,
  RunData,
  RunDataId,
} from '../../../../utils/dataFileSystem/dataFileSystemReader';
import { applyFilter } from './filters/filterService';
import { DefinitelyTypedRun } from './interfaces/definitelyTypedRun.interface';
import { DefinitelyTypedRunResponse } from './interfaces/definitelyTypedRunResponse';
import { DefinitelyTypedTypeRun } from './interfaces/definitelyTypedTypeRun.interface';
// @ts-ignore
const dataReader: DataReader = dataFileSystemReader(process.env.DEFINITELY_TYPED_DATA_URL, browserFileReader());

export function DefinitelyTyped(): JSX.Element {
  const [data, setData] = useState([] as DefinitelyTypedTypeRun[]);
  const [viewData, setViewData] = useState([] as DefinitelyTypedTypeRun[]);
  const [run, setRun] = useState('None');
  const [runs, setRuns] = useState([] as DefinitelyTypedRun[]);
  const [runInfo, setRunInfo] = useState({} as DefinitelyTypedRunInfo);
  const [filterOptions, setFilterOptions] = useState({} as DefinitelyTypedFiltersOptions);

  useEffect(() => {
    dataReader.getDataIds().then((result: RunDataId[]) => {
      result = result.sort((a: RunDataId, b: RunDataId) => a.date > b.date ? -1 : 1);

      setRuns(result.map(r => ({date: new Date(r.date), id: r.id})));

      if (result && result.length) {
        setRun(result[0].id);
      }
    });
  }, []);

  useEffect(() => {
    if (run === 'None') {
      return;
    }

    dataReader.getData(run).then((result: RunData) => {
      const dataToSet: DefinitelyTypedTypeRun[] = result.data.map(r => {
        return {
          item: r.item,
          message: r.message,
          response: mapToResponse(r.response)
        };
      });

      dataToSet.sort((a: DefinitelyTypedTypeRun, b: DefinitelyTypedTypeRun) => {
        return a.response === DefinitelyTypedRunResponse.Error ? -1
            : a.response === DefinitelyTypedRunResponse.Success ? 1
            : b.response === DefinitelyTypedRunResponse.Error ? 1
            : b.response === DefinitelyTypedRunResponse.Success ? -1
            : 0;
      });

      setData(dataToSet);
    });
  }, [run]);

  useEffect(() => {
    setRunInfo({
      success: data.filter(run => run.response === DefinitelyTypedRunResponse.Success).length,
      warning: data.filter(run => run.response === DefinitelyTypedRunResponse.Warning).length,
      error: data.filter(run => run.response === DefinitelyTypedRunResponse.Error).length,
      total: data.length
    });
  }, [data]);

  useEffect(() => {
    setViewData(applyFilter(data, filterOptions));
  }, [filterOptions, data]);

  const runOptions: JSX.Element[] = runs.map((run: DefinitelyTypedRun, index: number) => {
    return <option key={index} value={run.id}>Run on date {run.date.toISOString()}</option>;
  });

  const types: JSX.Element[] = !viewData ? [] : viewData.map(d => {
    return <details key={d.item} className={mapResponseToClassName(d.response)}>
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

    <DefinitelyTypedFilters filter={options => setFilterOptions(options)} runInfo={runInfo}/>

    <div className='DefinitelyTyped-typesContainer'>
      { types }
    </div>
  </div>;
}

function mapToResponse(response: string): DefinitelyTypedRunResponse {
  return response === 'error' ? DefinitelyTypedRunResponse.Error
      : response === 'warning' ? DefinitelyTypedRunResponse.Warning
          : DefinitelyTypedRunResponse.Success;
}

function mapResponseToClassName(response: DefinitelyTypedRunResponse): string {
  return response === DefinitelyTypedRunResponse.Success ? 'success'
      : response === DefinitelyTypedRunResponse.Warning ? 'warning'
          : 'error';
}
