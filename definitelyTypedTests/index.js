process.on('unhandledRejection', (error) => {
  console.log('unhandledRejection', error);
  process.exit(1);
});

require('dotenv').config();
const fs = require('fs');
const processService = require('../utils/process/process')(process);
const execPromise = require('../utils/exec/execPromise');
const definitelyTyped = require('./src/definitelyTyped')();
const config = require('./src/config');
const output = require('./src/multiProcessOutput');
const dataFileSystem = require('../utils/dataFileSystem/dataFileSystemWriter')(
  process.env.DEFINITELY_TYPED_DATA_URL
);

try {
  processService.ensureArgumentsValidity(['TYPES', 'PROCESS_COUNT']);
} catch (e) {
  console.error(e.message);
  return;
}

const outputService = output.createNew();

(async function runApp() {
  const typesDirectories = definitelyTyped.getTypes();
  const runConfig = await config();

  logConfig(runConfig);
  let startDirectoryIndex = runConfig.offsetType;
  const allRuns = [];

  for (let i = 0; i < runConfig.processes.length; i++) {
    allRuns.push(
      runAllDir(
        typesDirectories.slice(
          startDirectoryIndex,
          startDirectoryIndex + runConfig.processes[i].items
        ),
        i
      )
    );
    startDirectoryIndex += runConfig.processes[i].items;
  }

  Promise.all(allRuns).then(() => {
    const generatedOutput = outputService.generateOutput();
    const date = new Date().toISOString();

    if (runConfig.entryToUpdate) {
      dataFileSystem.updateData(
        runConfig.entryToUpdate.id,
        {
          lastUpdatedDate: date,
          typesProcessed: generatedOutput.length + runConfig.offsetType,
        },
        generatedOutput
      );
    } else {
      dataFileSystem.addData(
        {
          initialDate: date,
          lastUpdatedDate: date,
          typesProcessed: generatedOutput.length,
        },
        generatedOutput
      );
    }
  });
})();

function logConfig(processesConfig) {
  console.log(`Total types: ${processesConfig.totalTypesCount}`);
  console.log(`Processes: ${processesConfig.processes.length}`);
  console.log(
    `Average types per process: ${processesConfig.averageTypesCountPerProcess}`
  );
  console.log();
}

function runAllDir(dirs, processId) {
  fs.writeFileSync(`${processId}.index.ts`, '');
  fs.writeFileSync(`tsconfig.types.${processId}.json`, '');

  return dirs
    .reduce(
      (promise, dir) => promise.then(() => run(dir, processId)),
      Promise.resolve()
    )
    .then(() => {
      fs.unlinkSync(`tsconfig.types.${processId}.json`);
      fs.unlinkSync(`${processId}.index.ts`);
      if (fs.existsSync(`${processId}.index.js`)) {
        fs.unlinkSync(`${processId}.index.js`);
      }
    });
}

async function run(dir, processId) {
  const config = {
    compilerOptions: {
      lib: ['es6', 'dom'],
      noEmit: false,
      plugins: [
        {
          transform: './dist/transformer',
          debug: true,
        },
      ],
      typeRoots: [definitelyTyped.typesFolder],
      types: ['node'],
      baseUrl: definitelyTyped.typesFolder,
    },
    files: [`./${processId}.index.ts`],
  };

  const typePath = `${definitelyTyped.typesFolder}/${dir}`;
  const typeTsConfigPath = `${typePath}/tsconfig.json`;
  if (fs.existsSync(typeTsConfigPath)) {
    const typeTsConfigFileContent = await fs.promises.readFile(
      typeTsConfigPath
    );

    try {
      const typeTsConfig = JSON.parse(typeTsConfigFileContent);

      if (typeTsConfig && typeTsConfig.compilerOptions) {
        if (typeTsConfig.compilerOptions.paths) {
          config.compilerOptions.paths = typeTsConfig.compilerOptions.paths;
        }

        if (typeTsConfig.compilerOptions.lib) {
          config.compilerOptions.lib = typeTsConfig.compilerOptions.lib;
        }
      }
    } catch {
      console.warn('tsconfig.json of type found but failed to parse.');
    }
  }

  fs.writeFileSync(`tsconfig.types.${processId}.json`, JSON.stringify(config));
  fs.writeFileSync(
    `${processId}.index.ts`,
    `
// @ts-ignore
import pak = require('${typePath}');
import { createDefinitelyTypedMock } from './dist';
// @ts-ignore
createDefinitelyTypedMock<typeof pak>();
`
  );

  return execPromise(`npx ttsc --project tsconfig.types.${processId}.json`)
    .then((response) => {
      if (response) {
        process.stdout.write(`TYPE: ${dir} P${processId} `);
        console.warn('☐');
        outputService.addData(processId, dir, {
          response: 'warning',
          message: response.toString(),
        });
      } else {
        process.stdout.write(`TYPE: ${dir} P${processId} `);
        console.info('✔');
        outputService.addData(processId, dir, {
          response: 'success',
        });
      }
    })
    .catch((error) => {
      process.stdout.write(`TYPE: ${dir} P${processId} `);
      console.error('✘');

      let errorData = error.error.toString();
      console.error(error.error);

      if (error.stdout.trim()) {
        errorData += '\n' + error.stdout;
        console.error(error.stdout);
      }

      outputService.addData(processId, dir, {
        response: 'error',
        message: errorData,
      });
    });
}
