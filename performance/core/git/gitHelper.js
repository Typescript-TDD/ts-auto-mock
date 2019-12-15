const execPromise = require('../exec/execPromise');

function gitHelper() {
    return {
        getCurrentBranchName() {
            return execPromise('git rev-parse --abbrev-ref HEAD\n');
        },
        getCurrentCommit() {
            return execPromise('git rev-parse HEAD\n');
        }
    }
}

module.exports = gitHelper();
