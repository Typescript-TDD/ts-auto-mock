const execPromise = require('../exec/execPromise');

function gitHelper() {
    return {
        async getCurrentBranchName() {
            const remoteBranchName = await execPromise(`git ls-remote --heads origin | grep $(git rev-parse HEAD) | cut -d / -f 3`);

            if (!remoteBranchName) {
                return execPromise('git rev-parse --abbrev-ref HEAD\n')
            }

            return remoteBranchName;
        },
        getCurrentCommit() {
            return execPromise('git rev-parse HEAD\n');
        }
    }
}

module.exports = gitHelper();
