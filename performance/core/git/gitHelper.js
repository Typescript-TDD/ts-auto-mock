const execPromise = require('../exec/execPromise');

function gitHelper() {
    return {
        getCurrentBranchName() {
            return execPromise(`git ls-remote --heads origin | grep $(git rev-parse HEAD) | cut -d / -f 3`);
        },
        getCurrentCommit() {
            return execPromise('git rev-parse HEAD\n');
        }
    }
}

module.exports = gitHelper();
