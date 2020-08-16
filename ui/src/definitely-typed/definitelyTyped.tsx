import React, { useEffect, useState } from 'react';
import dataFileSystemReader, {
  DataReader,
  RunData,
  RunDataId,
  RunDataIdBase,
} from '../../../utils/dataFileSystem/dataFileSystemReader';
import { browserFileReader } from '../core/data/browserFileReader';
import { Select, Option } from '../style/select/select.styled';

import {
  DefinitelyTypedFilters,
  DefinitelyTypedFiltersOptions,
  DefinitelyTypedRunInfo,
} from './filters/definitelyTypedFilters';
import { applyFilter } from './filters/filterService';
import { DefinitelyTypedRun } from './interfaces/definitelyTypedRun.interface';
import { DefinitelyTypedRunResponse } from './interfaces/definitelyTypedRunResponse';
import { DefinitelyTypedTypeRun } from './interfaces/definitelyTypedTypeRun.interface';
import './definitelyTyped.scss';

export interface TypeRunData {
  item: string;
  response: string;
  message?: string;
}

export interface HeaderData {
  initialDate: string;
  lastUpdatedDate: string;
}

const dataReader: DataReader<HeaderData, TypeRunData> = dataFileSystemReader<
  HeaderData,
  TypeRunData // @ts-ignore
>(process.env.DEFINITELY_TYPED_DATA_URL, browserFileReader());

export function DefinitelyTyped(): JSX.Element {
  const [data, setData] = useState([] as DefinitelyTypedTypeRun[]);
  const [viewData, setViewData] = useState([] as DefinitelyTypedTypeRun[]);
  const [run, setRun] = useState('None');
  const [runs, setRuns] = useState([] as DefinitelyTypedRun[]);
  const [runInfo, setRunInfo] = useState({} as DefinitelyTypedRunInfo);
  const [filterOptions, setFilterOptions] = useState(
    {} as DefinitelyTypedFiltersOptions
  );

  useEffect(() => {
    dataReader.getDataIds().then((result: RunDataId<HeaderData>[]) => {
      result = result.sort(
        (a: RunDataId<HeaderData>, b: RunDataId<HeaderData>) =>
          a.lastUpdatedDate > b.lastUpdatedDate ? -1 : 1
      );

      setRuns(
        result.map((r: RunDataIdBase & HeaderData) => ({
          date: new Date(r.lastUpdatedDate),
          id: r.id,
        }))
      );

      if (result && result.length) {
        setRun(result[0].id);
      }
    });
  }, []);

  useEffect(() => {
    if (run === 'None') {
      return;
    }

    dataReader.getData(run).then((result: RunData<HeaderData, TypeRunData>) => {
      const dataToSet: DefinitelyTypedTypeRun[] = result.data.map((r) => {
        return {
          item: r.item,
          message: r.message,
          response: mapToResponse(r.response),
        };
      });

      dataToSet.sort((a: DefinitelyTypedTypeRun, b: DefinitelyTypedTypeRun) => {
        return a.response === DefinitelyTypedRunResponse.Error
          ? -1
          : a.response === DefinitelyTypedRunResponse.Success
          ? 1
          : b.response === DefinitelyTypedRunResponse.Error
          ? 1
          : b.response === DefinitelyTypedRunResponse.Success
          ? -1
          : 0;
      });

      setData(dataToSet);
    });
  }, [run]);

  useEffect(() => {
    setRunInfo({
      success: data.filter(
        (run) => run.response === DefinitelyTypedRunResponse.Success
      ).length,
      warning: data.filter(
        (run) => run.response === DefinitelyTypedRunResponse.Warning
      ).length,
      error: data.filter(
        (run) => run.response === DefinitelyTypedRunResponse.Error
      ).length,
      total: data.length,
    });
  }, [data]);

  useEffect(() => {
    setViewData(applyFilter(data, filterOptions));
  }, [filterOptions, data]);

  const runOptions: JSX.Element[] = runs.map(
    (run: DefinitelyTypedRun, index: number) => {
      return (
        <option key={index} value={run.id}>
          Run on date {run.date.toISOString()}
        </option>
      );
    }
  );

  const types: JSX.Element[] = !viewData
    ? []
    : viewData.map((d: DefinitelyTypedTypeRun, index: number) => {
        return (
          <details key={index} className={mapResponseToClassName(d.response)}>
            <summary>
              <span>{d.item}</span>
            </summary>
            <pre>{d.message}</pre>
          </details>
        );
      });

  return (
    <div className="DefinitelyTyped-container">
      <div className="DefinitelyTyped-select">
        <Select
          value={run}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            setRun(event.target.value)
          }
        >
          <Option value="None" disabled>
            None
          </Option>
          {runOptions}
        </Select>
      </div>

      <DefinitelyTypedFilters
        filter={(options) => setFilterOptions(options)}
        runInfo={runInfo}
      />

      <div className="DefinitelyTyped-typesContainer">{types}</div>
    </div>
  );
}

function mapToResponse(response: string): DefinitelyTypedRunResponse {
  return response === 'error'
    ? DefinitelyTypedRunResponse.Error
    : response === 'warning'
    ? DefinitelyTypedRunResponse.Warning
    : DefinitelyTypedRunResponse.Success;
}

function mapResponseToClassName(response: DefinitelyTypedRunResponse): string {
  return response === DefinitelyTypedRunResponse.Success
    ? 'success'
    : response === DefinitelyTypedRunResponse.Warning
    ? 'warning'
    : 'error';
}
