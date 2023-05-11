const fs = require('fs');
const execPromise = require('../../utils/exec/execPromise');
const definitelyTyped = require('./definitelyTyped')();
const path = require('path');
const upath = require('upath');
const output = require('./multiProcessOutput');

let outputService;

async function runProcesses(runConfig) {
  outputService = output.createNew();
  let startDirectoryIndex = 0;
  const allRuns = [];

  for (let i = 0; i < runConfig.processes.length; i++) {
    allRuns.push(
      runAllDir(
        runConfig.types.slice(
          startDirectoryIndex,
          startDirectoryIndex + runConfig.processes[i].items
        ),
        i
      )
    );
    startDirectoryIndex += runConfig.processes[i].items;
  }

  await Promise.all(allRuns);
  return outputService.generateOutput();
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

  const typePath = path.join(definitelyTyped.typesFolder, dir);
  const typeTsConfigPath = path.join(typePath, 'tsconfig.json');
  if (fs.existsSync(typeTsConfigPath)) {
    const typeTsConfigFileContent = await fs.promises.readFile(
      typeTsConfigPath
    );

    try {
      const typeTsConfig = JSON.parse(typeTsConfigFileContent);
      copyTsConfigValues(typeTsConfig, config,
        'paths',
        'lib',
        'types',
        'esModuleInterop',
        'target',
        'module'
      );
    } catch {
      console.warn('tsconfig.json of type found but failed to parse.');
    }
  }

  fs.writeFileSync(`tsconfig.types.${processId}.json`, JSON.stringify(config));
  const unixTypePath = upath.toUnix(typePath);
  fs.writeFileSync(
    `${processId}.index.ts`,
    `
// @ts-ignore
import pak = require('${unixTypePath}');
import { createDefinitelyTypedMock } from './dist';
// @ts-ignore
createDefinitelyTypedMock<typeof pak>();
`
  );

  return execPromise(`npx tspc --project tsconfig.types.${processId}.json`)
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

function copyTsConfigValues(typeTsConfig, config, ...props) {
  if (typeTsConfig && typeTsConfig.compilerOptions) {
    props.forEach(prop => {
      if (typeTsConfig.compilerOptions[prop]) {
        config.compilerOptions[prop] = typeTsConfig.compilerOptions[prop];
      }
    });
  }
}

module.exports = runProcesses;
