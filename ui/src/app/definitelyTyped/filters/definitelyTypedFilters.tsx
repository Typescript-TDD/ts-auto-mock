import React, { useEffect, useState } from 'react';
import './definitelyTypedFilters.scss';
import { useDebounce } from '../../useDebounce/useDebounce';

export interface DefinitelyTypedRunInfo {
    success: number;
    warning: number;
    error: number;
    total: number;
}

export interface DefinitelyTypedFiltersProps {
    runInfo: DefinitelyTypedRunInfo;
    filter(options: DefinitelyTypedFiltersOptions): void;
}

export interface DefinitelyTypedFiltersOptions {
    filterIn: RegExp | null;
    filterOut: RegExp | null;
    isShowingSuccesses: boolean;
    isShowingWarnings: boolean;
    isShowingErrors: boolean;
}

export function DefinitelyTypedFilters(props: DefinitelyTypedFiltersProps): JSX.Element {
    const [filterOut, setFilterOut] = useState('');
    const [filterIn, setFilterIn] = useState('');
    const [isShowing, setIsShowing] = useState('' as keyof DefinitelyTypedRunInfo);
    const debouncedFilterOut = useDebounce(filterOut, 500);
    const debouncedFilterIn = useDebounce(filterIn, 500);

    useEffect(() => {
        props.filter(buildOptions());
    }, [debouncedFilterOut, debouncedFilterIn, isShowing]);

    function buildOptions(): DefinitelyTypedFiltersOptions {
        return {
            filterIn: filterIn ? new RegExp(filterIn) : null,
            filterOut: filterOut ? new RegExp(filterOut) : null,
            isShowingErrors: isShowing === 'error',
            isShowingWarnings: isShowing === 'warning',
            isShowingSuccesses: isShowing === 'success'
        };
    }

    const infoKeys: Array<keyof DefinitelyTypedRunInfo> = ['total', 'success', 'warning', 'error'];
    const infoLabelMap: {[key in keyof DefinitelyTypedRunInfo]: string} = {
        error: 'Errors',
        success: 'Passed',
        warning: 'Warnings',
        total: 'Total Types'
    };

    const infoPanel: JSX.Element[] = infoKeys.map((infoKey: keyof DefinitelyTypedRunInfo) => {
        const selectedClass = infoKey === isShowing ? ' selected' : '';

        return <div key={infoKey} className={'DefinitelyTypedFilters-' + infoKey + selectedClass} onClick={() => setIsShowing(infoKey)}>
            <span className='DefinitelyTypedFilters-infoLabel'>{infoLabelMap[infoKey]}</span>
            <span className='DefinitelyTypedFilters-infoCount'>{props.runInfo[infoKey]}</span>
        </div>
    });

    return <div className='DefinitelyTypedFilters-container'>
        <div className='DefinitelyTypedFilters-controlsContainer'>
            <div className='DefinitelyTypedFilters-inputsContainer'>
                <div className='DefinitelyTypedFilters-input'>
                    <p>Filter out messages (regex)</p>
                    <input className='Input' type='text' value={filterOut} onChange={e => setFilterOut(e.target.value)} />
                </div>
                <div className='DefinitelyTypedFilters-input'>
                    <p>Filter in only messages (regex)</p>
                    <input className='Input' type='text' value={filterIn} onChange={e => setFilterIn(e.target.value)} />
                </div>
            </div>
        </div>
        <div className='DefinitelyTypedFilters-infoContainer'>
            {infoPanel}
        </div>
    </div>;
}
