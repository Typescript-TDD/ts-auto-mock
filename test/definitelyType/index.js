const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');

const PARALLEL_NPM_INSTALL = 20;
const RUN_NPM_INSTALL = true;

const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

const folder = path.join("DefinitelyTyped", "types");

const definitelyTypedDirectories = getDirectories(folder);
const processesConfig = getProcessesConfig();

function getProcessesCount() {
    return process.argv[3] && parseInt(process.argv[3]) || 1;
}

function getProcessesConfig() {
    const totalTypesCount = getTotalTypesCount();
    const processesMaximized = miximiseParallelRun(getProcessesCount(), totalTypesCount);
    const sum = processesMaximized.reduce((previous, current) => previous + current.items, 0);
    const avg = sum / processesMaximized.length;

    return {
        totalTypesCount: totalTypesCount,
        processes: processesMaximized,
        averageTypesCountPerProcess: avg
    };
}

function miximiseParallelRun(processesCount, totalItems) {
    const processes = [];
    const floored = Math.floor(totalItems / processesCount);
    let remaining = totalItems;

    for(let i = 0; i < processesCount; i++) {
        processes.push({
            items: Math.min(floored, remaining)
        });

        remaining -= floored;
    }

    return processes;
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function getTotalTypesCount() {
    if (process.argv[2]) {
        const maybeCount = parseInt(process.argv[2]);

        if (!Number.isNaN(maybeCount)) {
            return Math.min(definitelyTypedDirectories.length, maybeCount);
        } else if (process.argv[2] === "all") {
            return definitelyTypedDirectories.length;
        }
    }
    
    return 50;
}

function runAllDir(dirs, id) {
    fs.writeFileSync(`tsLogs.${id}.txt`, "===== Start run " + new Date().toISOString() + " - " + runUuid + " =====\n", { flag: "a+" });
    fs.writeFileSync(`tsconfig.types.${id}.json`, "");
    
    return dirs.reduce((promise, dir) => promise.then(() => run(dir, id)), Promise.resolve())
        .then(() => {
            fs.unlinkSync(`tsconfig.types.${id}.json`);
        });
}

// console.log(definitelyTypedDirectories);

let startDirectoryIndex = 0;

console.log(`Total types: ${processesConfig.totalTypesCount}`);
console.log(`Processes: ${processesConfig.processes.length}`);
console.log(`Average types per process: ${processesConfig.averageTypesCountPerProcess}`);
console.log();

const runUuid = uuidv4();
runApp();

async function runApp() {
    if (RUN_NPM_INSTALL) {
        await installDependencies();
    }

    for(let i = 0; i < processesConfig.processes.length; i++) {
        runAllDir(definitelyTypedDirectories.slice(startDirectoryIndex, startDirectoryIndex + processesConfig.processes[i].items), i);
        startDirectoryIndex += processesConfig.processes[i].items;
    }
}

async function installDependencies() {
    const processedDirectories = definitelyTypedDirectories.slice(0, processesConfig.totalTypesCount);

    const directoriesWithDependencies = processedDirectories
        .map(dir => ({ name: dir, path: path.join(folder, dir) }))
        .filter(dir => fs.existsSync(path.join(dir.path, "package.json")));
    
    if (directoriesWithDependencies.length === 0) {
        return Promise.resolve();
    }

    console.log(`npm install in ${directoriesWithDependencies.length} folders:`);

    const processes = miximiseParallelRun(PARALLEL_NPM_INSTALL, directoriesWithDependencies.length);
    let startIndex = 0;
    const processesPromiseList = [];

    for(let i = 0; i < processes.length; i++) {
        processesPromiseList.push(
            installDependenciesInDirectories(directoriesWithDependencies.slice(startIndex, startIndex + processes[i].items), i)
        );
        startIndex += processes[i].items;
    }

    return Promise.all(processesPromiseList).then(() => console.log("\n"));
}

let installedDependencyIndex = 0;
function installDependenciesInDirectories(directories) {
    return directories.reduce((promise, dir) => promise.then(() => {
        process.stdout.write(`(${++installedDependencyIndex}):${dir.name} `);
        return execPromise(`(cd ./${dir.path} && npm install)`).catch(err => {
            fs.writeFileSync(`tsLogs.npmErrors.txt`, "Error in run " + runUuid + " :: " + err, { flag: "a+" });
        });
    }), Promise.resolve())
}

async function run(dir, id) {
    const config = {
        "extends": `./DefinitelyTyped/types/${dir}/tsconfig.json`,
        "compilerOptions": {
            "noEmit": false,
            "plugins": [
                {
                    "transform": "../../dist/transformer",
                    "debug": true
                }
            ]
        }
    };

    fs.writeFileSync(`tsconfig.types.${id}.json`, JSON.stringify(config));

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
