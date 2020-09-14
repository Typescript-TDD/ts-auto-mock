const processService = require('../../utils/process/process')(process);
const maximiseParallelRun = require('./maximiseParallel');
const definitelyTyped = require('./definitelyTyped')();
const nodeReader = require('../../utils/dataFileSystem/nodeFileReader')();
const dataFileSystemReader = require('../../utils/dataFileSystem/dataFileSystemReader');
const dataReader = dataFileSystemReader(
  process.env.DEFINITELY_TYPED_DATA_URL,
  nodeReader
);

async function getRunConfig() {
  const types = getTypes();
  const batchConfig = await getBatchConfig(types);
  const typesBatch = getBatchToProcess(types, batchConfig);
  const totalTypesCount = typesBatch.length;
  const processesMaximized = maximiseParallelRun(
    getProcessesCount(),
    totalTypesCount
  );
  const sum = processesMaximized.reduce(
    (previous, current) => previous + current.items,
    0
  );
  const avg = sum / processesMaximized.length;

  return {
    totalTypesCount: totalTypesCount,
    processes: processesMaximized,
    averageTypesCountPerProcess: avg,
    types: typesBatch,
    ...batchConfig,
  };
}

function getTypes() {
  const typesArgument = processService.getArgument('TYPES');
  if (typesArgument) {
    const specifiedTypes = typesArgument.toString().split(',');
    const typesMap = {};
    definitelyTyped.getTypes().forEach((t) => (typesMap[t] = true));

    return specifiedTypes.filter((t) => typesMap[t]);
  } else {
    return definitelyTyped.getTypes();
  }
}

async function getBatchConfig(types) {
  if (!processService.getArgument('OUTPUT')) {
    return {
      entryToUpdate: null,
      offsetType: 0,
    };
  }

  const listEntry = await dataReader.getDataIds();
  const latestEntry = getLatestEntry(listEntry);
  const entryToUpdate =
    latestEntry && latestEntry.typesProcessed >= types.length
      ? { id: 'NEW_ENTRY' }
      : latestEntry;
  const offsetType =
    entryToUpdate.id === 'NEW_ENTRY' ? 0 : latestEntry.typesProcessed;

  return {
    entryToUpdate,
    offsetType,
  };
}

function getBatchToProcess(types, config) {
  return types.slice(config.offsetType, config.offsetType + getBatchAmount(types, config));
}

function getBatchAmount(types, config) {
  const typesDirectoriesLength = types.length - config.offsetType;
  const typesToProcess = processService.getArgument('TYPES_COUNT');

  if (typesToProcess) {
    const maybeCount = parseInt(typesToProcess);

    if (!Number.isNaN(maybeCount)) {
      return Math.min(typesDirectoriesLength, maybeCount);
    } else if (typesToProcess.toLowerCase() === 'all') {
      return typesDirectoriesLength;
    }
  }

  return 50;
}

function getLatestEntry(latestListEntry) {
  return latestListEntry.sort((a, b) => {
    return a.lastUpdatedDate > b.lastUpdatedDate ? -1 : 1;
  })[0];
}

function getProcessesCount() {
  return processService.getArgument('PROCESS_COUNT') || 1;
}

module.exports = getRunConfig;
