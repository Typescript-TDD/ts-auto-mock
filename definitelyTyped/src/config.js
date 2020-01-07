const processService = require('../../utils/process/process')(process);
const maximiseParallelRun = require('./maximiseParallel');
const definitelyTyped = require('./definitelyTyped');

function getProcessesConfig() {
    const totalTypesCount = getTotalTypesCount();
    const processesMaximized = maximiseParallelRun(getProcessesCount(), totalTypesCount);
    const sum = processesMaximized.reduce((previous, current) => previous + current.items, 0);
    const avg = sum / processesMaximized.length;

    return {
        totalTypesCount: totalTypesCount,
        processes: processesMaximized,
        averageTypesCountPerProcess: avg
    };
}

function getTotalTypesCount() {
    const typesDirectories = definitelyTyped.getTypes();
    const typesToProcess = processService.getArgument('TYPES');

    if (typesToProcess) {
        const maybeCount = parseInt(typesToProcess);

        if (!Number.isNaN(maybeCount)) {
            return Math.min(typesDirectories.length, maybeCount);
        } else if (typesToProcess === "all") {
            return typesDirectories.length;
        }
    }

    return 50;
}

function getProcessesCount() {
    return processService.getArgument('PROCESS_COUNT') || 1;
}

module.exports = getProcessesConfig;
