import React, { useEffect, useState } from 'react';
import './definitelyTypedFilters.scss';
import '../input/input.scss';
import { useDebounce } from '../../core/useDebounce/useDebounce';
import { Option, Select } from '../../style/select/select.styled';
import { DefinitelyTypedTypeRun } from "../interfaces/definitelyTypedTypeRun.interface";
import { ErrorPresetFilters, PresetFilter } from "./errorPresetFilters";

export interface DefinitelyTypedRunInfo {
  success: number;
  warning: number;
  error: number;
  total: number;
}

export interface DefinitelyTypedFiltersProps {
  runInfo: DefinitelyTypedRunInfo;
  data: DefinitelyTypedTypeRun[];
  filter(options: DefinitelyTypedFiltersOptions): void;
}

export interface DefinitelyTypedFiltersOptions {
  filterIn: RegExp | null;
  filterOut: RegExp | null;
  isShowingSuccesses: boolean;
  isShowingWarnings: boolean;
  isShowingErrors: boolean;
}

enum DefaultOptionId {
  None = -1,
  Custom = -2
}

export function DefinitelyTypedFilters(
  props: DefinitelyTypedFiltersProps
): JSX.Element {
  const [filterOut, setFilterOut] = useState('');
  const [filterIn, setFilterIn] = useState('');
  const [errorPresetFilterId, setErrorPresetFilterId] = useState(DefaultOptionId.None);
  const [isShowing, setIsShowing] = useState(
    '' as keyof DefinitelyTypedRunInfo
  );
  const debouncedFilterOut = useDebounce(filterOut, 500);
  const debouncedFilterIn = useDebounce(filterIn, 500);

  useEffect(() => {
    props.filter(buildOptions());
  }, [debouncedFilterOut, debouncedFilterIn, isShowing, errorPresetFilterId]);

  function buildOptions(): DefinitelyTypedFiltersOptions {
    return {
      filterIn: buildFilterInOption(),
      filterOut: filterOut ? new RegExp(filterOut, 'i') : null,
      isShowingErrors: isShowing === 'error',
      isShowingWarnings: isShowing === 'warning',
      isShowingSuccesses: isShowing === 'success',
    };
  }

  function buildFilterInOption() {
    if (isShowing === 'error') {
      return errorPresetFilterId === DefaultOptionId.Custom && filterIn
        ? new RegExp(filterIn, 'i')
        : errorPresetFilterId === DefaultOptionId.None
        ? null
        : errorPresetFilterId !== DefaultOptionId.Custom
        ? errorPresetFilters[errorPresetFilterId].regex
        : null;
    }

    return filterIn ? new RegExp(filterIn, 'i') : null;
  }

  const infoKeys: Array<keyof DefinitelyTypedRunInfo> = [
    'total',
    'success',
    'warning',
    'error',
  ];

  const infoLabelMap: { [key in keyof DefinitelyTypedRunInfo]: string } = {
    error: 'Errors',
    success: 'Passed',
    warning: 'Warnings',
    total: 'Total Types',
  };

  const infoPanel: JSX.Element[] = infoKeys.map(
    (infoKey: keyof DefinitelyTypedRunInfo) => {
      const selectedClass = infoKey === isShowing ? ' selected' : '';

      return (
        <div
          key={infoKey}
          className={'DefinitelyTypedFilters-' + infoKey + selectedClass}
          onClick={() => setIsShowing(infoKey)}
        >
          <span className="DefinitelyTypedFilters-infoLabel">
            {infoLabelMap[infoKey]}
          </span>
          <span className="DefinitelyTypedFilters-infoCount">
            {props.runInfo[infoKey]}
          </span>
        </div>
      );
    }
  );

  type PresetFilterDefaultOption = { name: string, id?: number, disabled?: boolean; };

  let errorPresetFilters: PresetFilter[] = [];

  if (isShowing === 'error') {
    errorPresetFilters = ErrorPresetFilters.filter(filter => props.data.some(d => filter.regex.test(d.message || '')));
  }

  const errorPresetFilterOptionsDefault: PresetFilterDefaultOption[] = [
    {
      name: 'None',
      id: DefaultOptionId.None
    },
    {
      name: 'Custom',
      id: DefaultOptionId.Custom
    },
    {
      name: '-',
      disabled: true
    }
  ];
  const errorPresetFilterOptions: JSX.Element[] = errorPresetFilterOptionsDefault.map(
    (errorFilter) => {
      return (
        <Option key={errorFilter.id} value={errorFilter.id} disabled={errorFilter.disabled}>
          {errorFilter.name}
        </Option>
      );
    }
  ).concat((errorPresetFilters).map(
    (errorFilter: PresetFilter, index: number) => {
      return (
        <Option key={index} value={index}>
          {errorFilter.name}
        </Option>
      );
    }
  ));

  return (
    <div className="DefinitelyTypedFilters-container">
      <div className="DefinitelyTypedFilters-controlsContainer">
        <div className="DefinitelyTypedFilters-inputsContainer">
          <div className="DefinitelyTypedFilters-input">
            <p>Filter out messages (regex)</p>
            <input
              className="Input"
              type="text"
              value={filterOut}
              onChange={(e) => setFilterOut(e.target.value)}
            />
          </div>
          {isShowing === 'error' && (
            <div className="DefinitelyTypedFilters-input">
              <p>Filter in only messages</p>
              <Select
                value={errorPresetFilterId}
                onChange={(e) => setErrorPresetFilterId(Number(e.target.value))}
              >
                {errorPresetFilterOptions}
              </Select>
            </div>
          )}
          {(isShowing !== 'error' || errorPresetFilterId === DefaultOptionId.Custom) && (
            <div className="DefinitelyTypedFilters-input">
              <p>Filter in only messages (regex)</p>
              <input
                className="Input"
                type="text"
                value={filterIn}
                onChange={(e) => setFilterIn(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
      <div className="DefinitelyTypedFilters-infoContainer">{infoPanel}</div>
    </div>
  );
}
