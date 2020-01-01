const execPromise = require('../exec/execPromise');

function gitHelper() {
    return {
        getCurrentBranchName() {
            return execPromise('git rev-parse --abbrev-ref HEAD\n');
        },
        async getCurrentBranchNameFromCommit() {
            const commit = await this.getCurrentCommit();
            const name = await execPromise(`git branch --contains ${commit}`);

            return name.replace("* ", "");
        },
        getCurrentCommit() {
            return execPromise('git rev-parse HEAD\n');
        }
    }
}

module.exports = gitHelper();
