const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');

const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);


const folder = path.join("DefinitelyTyped", "types");
const definitelyTypedDirectories = getDirectories(folder);

function runAllDir(dirs) {
    return dirs.reduce(
      (promise, dir) => {
          return promise.then(() => run(dir)).catch(() => Promise.resolve());
      },
      Promise.resolve()
    );
}

console.log(definitelyTypedDirectories);
runAllDir([definitelyTypedDirectories[0]]);

async function run(dir) {
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

    await fs.writeFileSync('tsconfig.types.json', JSON.stringify(config));
    console.log(`TYPE: ${dir}`);

    return execPromise('npx ttsc --project tsconfig.types.json');
}


function execPromise(command) {
    return new Promise(function(resolve, reject) {
        const existingLogs = fs.readFileSync("tsLogs.txt");
        exec(command, (error, stdout) => {
            if (error) {
                fs.writeFileSync("tsLogs.txt", existingLogs + '\n' + error);
                reject(error);
                return;
            }

            const response = stdout.trim();
            console.log(response);
            fs.writeFileSync("tsLogs.txt", existingLogs + '\n' + response);
            resolve(response);
        });
    });
}
