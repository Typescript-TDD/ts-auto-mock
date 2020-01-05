const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');
const processService = require('../utils/process/process')(process);
const maximiseParallelRun = require('./src/maximise-parallel');
const definitelyTyped = require('./src/definitely-typed');

try {
    processService.ensureArgumentsValidity(['TYPES', 'PROCESS_COUNT', 'DEBUG']);
} catch(e) {
    console.error(e.message);
    return;
}

const typesDirectories = definitelyTyped.getTypes();
const processesConfig = getProcessesConfig();

function getProcessesCount() {
    return processService.getArgument('PROCESS_COUNT') || 1;
}

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

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function getTotalTypesCount() {
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

function runAllDir(dirs, id) {
    fs.writeFileSync(`tsLogs.${id}.txt`, "===== Start run " + new Date().toISOString() + " - " + runUuid + " =====\n", { flag: "a+" });
    fs.writeFileSync(`${id}.index.ts`, "");
    fs.writeFileSync(`tsconfig.types.${id}.json`, "");

    return dirs.reduce((promise, dir) => promise.then(() => run(dir, id)), Promise.resolve())
        .then(() => {
            fs.unlinkSync(`tsconfig.types.${id}.json`);
            fs.unlinkSync(`${id}.index.ts`);
        });
}

let startDirectoryIndex = 0;

console.log(`Total types: ${processesConfig.totalTypesCount}`);
console.log(`Processes: ${processesConfig.processes.length}`);
console.log(`Average types per process: ${processesConfig.averageTypesCountPerProcess}`);
console.log();

const runUuid = uuidv4();
runApp();

async function runApp() {
    for(let i = 0; i < processesConfig.processes.length; i++) {
        runAllDir(typesDirectories.slice(startDirectoryIndex, startDirectoryIndex + processesConfig.processes[i].items), i);
        startDirectoryIndex += processesConfig.processes[i].items;
    }
}

async function run(dir, id) {
    const config = {
        "extends": `./DefinitelyTyped/types/${dir}/tsconfig.json`,
        "compilerOptions": {
            "noEmit": !processService.getArgument('DEBUG'),
            "plugins": [
                {
                    "transform": "../dist/transformer",
                    "debug": true
                }
            ]
        },
        "files": [
            `./${id}.index.ts`
        ]
    };

    fs.writeFileSync(`tsconfig.types.${id}.json`, JSON.stringify(config));
    fs.writeFileSync(`${id}.index.ts`, `import pak = require('${dir}'); import { createMock } from '../dist'; createMock<typeof pak>();`);

    return execPromise(`npx ttsc --project tsconfig.types.${id}.json`)
        .then((response) => {
            if (response) {
                process.stdout.write(`TYPE: ${dir} P${id} `);
                console.warn("☐");
                fs.writeFileSync(`tsLogs.${id}.txt`, "Success with response in " + dir + ':\n' + response, { flag:'a+' });
            } else {
                process.stdout.write(`TYPE: ${dir} P${id} `);
                console.info("✔");
            }
        })
        .catch(error => {
            process.stdout.write(`TYPE: ${dir} P${id} `);
            console.error("✘");
            fs.writeFileSync(`tsLogs.${id}.txt`, "Error in " + dir + ':\n' + error, { flag:'a+' });
        });
}

function execPromise(command) {
    return new Promise(function(resolve, reject) {
        exec(command, (error, stdout) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(stdout.trim());
        });
    });
}
