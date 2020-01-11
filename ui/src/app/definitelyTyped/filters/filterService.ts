import { DefinitelyTypedRunResponse } from '../interfaces/definitelyTypedRunResponse';
import { DefinitelyTypedTypeRun } from '../interfaces/definitelyTypedTypeRun.interface';
import { DefinitelyTypedFiltersOptions } from './definitelyTypedFilters';

export function applyFilter(data: DefinitelyTypedTypeRun[], filterOptions: DefinitelyTypedFiltersOptions): DefinitelyTypedTypeRun[] {
    let temporaryData: DefinitelyTypedTypeRun[] = data;

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

    return temporaryData;
}
