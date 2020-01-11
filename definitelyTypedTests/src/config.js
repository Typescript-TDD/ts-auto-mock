const processService = require('../../utils/process/process')(process);
const maximiseParallelRun = require('./maximiseParallel');
const definitelyTyped = require('./definitelyTyped')();
const nodeReader = require('../../utils/dataFileSystem/nodeFileReader')();
const dataFileSystemReader = require("../../utils/dataFileSystem/dataFileSystemReader");
const dataReader = dataFileSystemReader(process.env.DEFINITELY_TYPED_DATA_URL, nodeReader);

function getLatestEntry(latestListEntry) {
    return latestListEntry.sort((a, b) => {
        return a.lastUpdatedDate > b.lastUpdatedDate ? -1 : 1;
    })[0];
}

async function getRunConfig() {
    const listEntry = await dataReader.getDataIds();
    const latestEntry = getLatestEntry(listEntry);
    const totalTypes = definitelyTyped.getTypes().length;
    const entryToUpdate = latestEntry && latestEntry.typesProcessed >= totalTypes ? null : latestEntry;
    const offsetType = entryToUpdate ? entryToUpdate.typesProcessed : 0;

    const totalTypesCount = getTotalTypesCount(offsetType, totalTypes);
    const processesMaximized = maximiseParallelRun(getProcessesCount(), totalTypesCount);
    const sum = processesMaximized.reduce((previous, current) => previous + current.items, 0);
    const avg = sum / processesMaximized.length;

    return {
        totalTypesCount: totalTypesCount,
        processes: processesMaximized,
        averageTypesCountPerProcess: avg,
        entryToUpdate: entryToUpdate,
        offsetType: offsetType
    };
}

function getTotalTypesCount(offsetType, totalTypes) {
    const typesDirectoriesLength = totalTypes - offsetType;
    const typesToProcess = processService.getArgument('TYPES');

    if (typesToProcess) {
        const maybeCount = parseInt(typesToProcess);

        if (!Number.isNaN(maybeCount)) {
            return Math.min(typesDirectoriesLength, maybeCount);
        } else if (typesToProcess === "all") {
            return typesDirectoriesLength;
        }
    }

    return 50;
}

function getProcessesCount() {
    return processService.getArgument('PROCESS_COUNT') || 1;
}

module.exports = getRunConfig;
