process.on('unhandledRejection', (error) => {
  console.log('unhandledRejection', error);
  process.exit(1);
});

require('dotenv').config();
const processService = require('../utils/process/process')(process);
const config = require('./src/config');
const runProcesses = require('./src/processRunner');
const dataFileSystem = require('../utils/dataFileSystem/dataFileSystemWriter')(
  process.env.DEFINITELY_TYPED_DATA_URL
);

try {
  processService.ensureArgumentsValidity(['TYPES', 'TYPES_COUNT', 'PROCESS_COUNT', 'OUTPUT']);
} catch (e) {
  console.error(e.message);
  return;
}

(async function runApp() {
  const runConfig = await config();

  logConfig(runConfig);
  const generatedOutput = await runProcesses(runConfig);
  await writeOutput(runConfig, generatedOutput);
})();

async function writeOutput(runConfig, generatedOutput) {
  if (!runConfig.entryToUpdate)
    return;

  const date = new Date().toISOString();

  if (runConfig.entryToUpdate.id === 'NEW_ENTRY') {
    await dataFileSystem.addData(
      {
        initialDate: date,
        lastUpdatedDate: date,
        typesProcessed: generatedOutput.length,
      },
      generatedOutput
    );
  } else {
    await dataFileSystem.updateData(
      runConfig.entryToUpdate.id,
      {
        lastUpdatedDate: date,
        typesProcessed: generatedOutput.length + runConfig.offsetType,
      },
      generatedOutput
    );
  }
}

function logConfig(processesConfig) {
  console.log(`Total types: ${processesConfig.totalTypesCount}`);
  console.log(`Processes: ${processesConfig.processes.length}`);
  console.log(
    `Average types per process: ${processesConfig.averageTypesCountPerProcess}`
  );
  console.log();
}
