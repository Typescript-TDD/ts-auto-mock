const exec = require('child_process').exec;

function execPromise(command) {
    return new Promise(function(resolve, reject) {
        exec(command, (error, stdout) => {
            if (error) {
                console.error(error);
                reject(error);
                return;
            }

            resolve(stdout.trim());
        });
    });
}

module.exports = execPromise;
