import React, { useEffect, useState } from 'react';
import './definitelyTypedFilters.scss';

export interface DefinitelyTypedFiltersProps {
    initialOptions: DefinitelyTypedFiltersOptions;
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
    const [isShowingSuccesses, setIsShowingSuccesses] = useState(true);
    const [isShowingWarnings, setIsShowingWarnings] = useState(true);
    const [isShowingErrors, setIsShowingErrors] = useState(true);

    useEffect(() => {
        setFilterIn(props.initialOptions.filterIn ? props.initialOptions.filterIn!.toString() : '');
        setFilterOut(props.initialOptions.filterOut ? props.initialOptions.filterOut!.toString() : '');
        setIsShowingSuccesses(props.initialOptions.isShowingSuccesses);
        setIsShowingWarnings(props.initialOptions.isShowingWarnings);
        setIsShowingErrors(props.initialOptions.isShowingErrors);
    }, []);

    function buildOptions(): DefinitelyTypedFiltersOptions {
        return {
            filterIn: filterIn ? new RegExp(filterIn) : null,
            filterOut: filterOut ? new RegExp(filterOut) : null,
            isShowingErrors: isShowingErrors,
            isShowingWarnings: isShowingWarnings,
            isShowingSuccesses: isShowingSuccesses
        };
    }

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
            <div className='DefinitelyTypedFilters-checkboxesContainer'>
                <div className='DefinitelyTypedFilters-checkbox'>
                    <p>Include successes</p>
                    <input className='Checkbox' type='checkbox' checked={isShowingSuccesses} onChange={e => setIsShowingSuccesses(!isShowingSuccesses)} />
                </div>
                <div className='DefinitelyTypedFilters-checkbox'>
                    <p>Include warnings</p>
                    <input className='Checkbox' type='checkbox' checked={isShowingWarnings} onChange={e => setIsShowingWarnings(!isShowingWarnings)} />
                </div>
                <div className='DefinitelyTypedFilters-checkbox'>
                    <p>Include errors</p>
                    <input className='Checkbox' type='checkbox' checked={isShowingErrors} onChange={e => setIsShowingErrors(!isShowingErrors)} />
                </div>
            </div>
        </div>
        <button className='DefinitelyTypedFilters-button' onClick={() => props.filter(buildOptions())}>Filter</button>
    </div>;
}
