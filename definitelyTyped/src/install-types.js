const path = require('path');
const fs = require('fs');
const execPromise = require('../../utils/exec/execPromise');
const maximiseParallelRun = require('./maximise-parallel');
const definitelyTyped = require('./definitely-typed');

const PARALLEL_NPM_INSTALL = 20;

(async function() {
    await cloneRepository();
    await installDependencies();
})();

async function cloneRepository() {
    return execPromise(`git clone https://github.com/DefinitelyTyped/DefinitelyTyped.git ../${definitelyTyped.folder}`);
}

async function installDependencies() {
    const typesDirectories = definitelyTyped.getTypes();

    const directoriesWithDependencies = typesDirectories
        .map(dir => ({ name: dir, path: path.join(definitelyTyped.typesFolder, dir) }))
        .filter(dir => fs.existsSync(path.join(dir.path, "package.json")));

    if (directoriesWithDependencies.length === 0) {
        return Promise.resolve();
    }

    console.log(`npm install in ${directoriesWithDependencies.length} folders:`);

    const processes = maximiseParallelRun(PARALLEL_NPM_INSTALL, directoriesWithDependencies.length);
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
        return execPromise(`(cd ../${dir.path} && npm install)`).catch(err => {
            fs.writeFileSync(`../tsLogs.npmErrors.txt`, "Error " + new Date().toISOString() + " :: " + err, { flag: "a+" });
        });
    }), Promise.resolve())
}
