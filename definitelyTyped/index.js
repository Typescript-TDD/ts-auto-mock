require('dotenv').config();
const path = require('path');
const fs = require('fs');
const processService = require('../utils/process/process')(process);
const execPromise = require('../utils/exec/execPromise');
const definitelyTyped = require('./src/definitelyTyped')();
const config = require('./src/config');
const output = require('./src/multiProcessOutput');
const dataFileSystem = require('./src/dataFileSystemWriter')(process.env.DEFINITELY_TYPED_DATA_URL);
const uuid = require('./src/uuid');

try {
    processService.ensureArgumentsValidity(['TYPES', 'PROCESS_COUNT', 'DEBUG']);
} catch(e) {
    console.error(e.message);
    return;
}

const outputService = output.createNew();

(async function runApp() {
    const typesDirectories = definitelyTyped.getTypes();
    const processesConfig = config();
    logConfig(processesConfig);
    let startDirectoryIndex = 0;
    const allRuns = [];

    for(let i = 0; i < processesConfig.processes.length; i++) {
        allRuns.push(
            runAllDir(typesDirectories.slice(startDirectoryIndex, startDirectoryIndex + processesConfig.processes[i].items), i)
        );
        startDirectoryIndex += processesConfig.processes[i].items;
    }

    Promise.all(allRuns).then(() => {
        dataFileSystem.addData(uuid(), outputService.generateOutput());
    });
})();

function logConfig(processesConfig) {
    console.log(`Total types: ${processesConfig.totalTypesCount}`);
    console.log(`Processes: ${processesConfig.processes.length}`);
    console.log(`Average types per process: ${processesConfig.averageTypesCountPerProcess}`);
    console.log();
}

function runAllDir(dirs, processId) {
    fs.writeFileSync(`${processId}.index.ts`, '');
    fs.writeFileSync(`tsconfig.types.${processId}.json`, '');

    return dirs.reduce((promise, dir) => promise.then(() => run(dir, processId)), Promise.resolve())
        .then(() => {
            fs.unlinkSync(`tsconfig.types.${processId}.json`);
            fs.unlinkSync(`${processId}.index.ts`);
        });
}

async function run(dir, processId) {
    const config = {
        'extends': `./${definitelyTyped.typesFolder}/${dir}/tsconfig.json`,
        'compilerOptions': {
            'noEmit': !processService.getArgument('DEBUG'),
            'plugins': [
                {
                    'transform': '../dist/transformer',
                    'debug': true
                }
            ]
        },
        'files': [
            `./${processId}.index.ts`
        ]
    };

    fs.writeFileSync(`tsconfig.types.${processId}.json`, JSON.stringify(config));
    fs.writeFileSync(`${processId}.index.ts`, `import pak = require('${dir}'); import { createMock } from '../dist'; createMock<typeof pak>();`);

    return execPromise(`npx ttsc --project tsconfig.types.${processId}.json`)
        .then((response) => {
            if (response) {
                process.stdout.write(`TYPE: ${dir} P${processId} `);
                console.warn('☐');
                outputService.addData(processId, dir, {
                    response: 'warning',
                    message: response
                });
            } else {
                process.stdout.write(`TYPE: ${dir} P${processId} `);
                console.info('✔');
                outputService.addData(processId, dir, {
                    response: 'success'
                });
            }
        })
        .catch(error => {
            process.stdout.write(`TYPE: ${dir} P${processId} `);
            console.error('✘');
            outputService.addData(processId, dir, {
                response: 'error',
                message: error
            });
        });
}
