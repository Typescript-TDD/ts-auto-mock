const execPromise = require('../exec/execPromise');

function gitHelper() {
    return {
        getCurrentBranchName() {
            return execPromise(`git for-each-ref --format='%(objectname) %(refname:short)' refs/heads | awk "/^$(git rev-parse HEAD)/ {print \$2}"`);
        },
        getCurrentCommit() {
            return execPromise('git rev-parse HEAD\n');
        }
    }
}

module.exports = gitHelper();
