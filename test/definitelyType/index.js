const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');

const typesCountPerProcess = process.argv[2] && parseInt(process.argv[2]) || 50;
const processesCount = process.argv[3] && parseInt(process.argv[3]) || 1;

const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);


const folder = path.join("DefinitelyTyped", "types");
const definitelyTypedDirectories = getDirectories(folder);

function runAllDir(dirs, id) {
    fs.writeFileSync(`tsLogs.${id}.txt`, "===== Start run " + new Date().toISOString() + " =====\n", { flag: "a+" });
    fs.writeFileSync(`tsconfig.types.${id}.json`, "");
    
    return dirs.reduce((promise, dir) => promise.then(() => run(dir, id)), Promise.resolve())
        .then(() => {
            fs.unlinkSync(`tsconfig.types.${id}.json`);
        });
}

// console.log(definitelyTypedDirectories);

let startDirectoryIndex = 0;

console.log(`Processes: ${processesCount}`);
console.log(`Types per process: ${typesCountPerProcess}`);
console.log(`Total: ${Math.min(definitelyTypedDirectories.length, processesCount * typesCountPerProcess)}\n`);

runApp();

async function runApp() {
    await installDependencies();

    for(let i = 0; i < processesCount; i++) {
        runAllDir(definitelyTypedDirectories.slice(startDirectoryIndex, startDirectoryIndex + typesCountPerProcess), i);
        startDirectoryIndex += typesCountPerProcess;
    }
}

async function installDependencies() {
    const processedDirectories = definitelyTypedDirectories.slice(0, typesCountPerProcess * processesCount);

    return Promise.all(
        processedDirectories
            .map(dir => path.join(folder, dir))
            .filter(directoryPath => fs.existsSync(path.join(directoryPath, "package.json")))
            .map(directoryPath => {
                console.log(`Executing \`npm --prefix ${directoryPath} install ${directoryPath}\``);
                return execPromise(`npm --prefix ${directoryPath} install ${directoryPath}`).catch(e => e).then(r => console.log(r));
            })
    );
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
                console.warn("O");
                fs.writeFileSync(`tsLogs.${id}.txt`, "Success with response in " + dir + ':\n' + response, { flag:'a+' });
            } else {
                process.stdout.write(`TYPE: ${dir} P${id} `);
                console.info("Y");
            }
        })
        .catch(error => {
            process.stdout.write(`TYPE: ${dir} P${id} `);
            console.error("X");
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
