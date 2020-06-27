process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error);
    process.exit(1);
});

const path = require('path');
const fs = require('fs');
const execPromise = require('../../utils/exec/execPromise');
const maximiseParallelRun = require('./maximiseParallel');
const definitelyTyped = require('./definitelyTyped')();

const PARALLEL_NPM_INSTALL = 20;

(async function() {
    try {
        await cloneRepository();
        await installDependencies();
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
})();

function cloneRepository() {
    const command = `git clone --depth 1 https://github.com/DefinitelyTyped/DefinitelyTyped.git ${definitelyTyped.folder}`;
    console.log(`Cloning repository using ${command}`);

    return execPromise(command)
      .then(() => {
          console.log('Done cloning.');
      });
}

async function installDependencies() {
    console.log('Installing dependencies');
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
    const installer = dependencyInstaller();

    for(let i = 0; i < processes.length; i++) {
        processesPromiseList.push(
            installer(directoriesWithDependencies.slice(startIndex, startIndex + processes[i].items))
        );
        startIndex += processes[i].items;
    }

    return Promise.all(processesPromiseList).then(() => console.log("\n"));
}

function dependencyInstaller() {
    let installedDependencyIndex = 0;

    return function installDependenciesInDirectories(directories) {
        return directories.reduce((promise, dir) => promise.then(() => {
            console.log(`(${++installedDependencyIndex}):${dir.name}`);
            return execPromise(`(cd ${dir.path} && npm install)`).catch(err => {
                console.error(`Error :: ${err.error} :: ${err.stdout}`);
            });
        }), Promise.resolve())
    }
}
