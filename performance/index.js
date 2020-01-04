const path = require('path');
const fileSystem = require('./core/fs/fileSystem');
const gitHelper = require('./core/git/gitHelper');
const testRunner = require('./testRunner/testRunner');
const LocalRepository = require("./repository/localRepository");
const localFileData = path.join(__dirname, '../', 'data');

const localRepository = LocalRepository(localFileData, 'performance.json');

(async function () {
    const config = getPerformanceConfig();
    const testResults = await runTestFromConfig(config);

    const currentCommit = await gitHelper.getCurrentCommit();
    const currentBranch = await gitHelper.getCurrentBranchName();

    const existingData = await localRepository.get();

    const data = addTestResultsToData(existingData, testResults, currentBranch, currentCommit);

    await localRepository.update(data);
})();

function addTestResultsToData(data, results, currentBranch, currentCommit) {
    const now = new Date().toISOString();

    if (!data) {
        data = {};
    }

    if (data[currentBranch]) {
        if (data[currentBranch][currentCommit]) {
            data[currentBranch][currentCommit][now] = results;
        } else {
            data[currentBranch][currentCommit] = {
                [now]: results
            }
        }
    } else {
        data[currentBranch] = {
            [currentCommit]: {
                [now]: results
            }
        }
    }

    return data;
}

function getPerformanceConfig() {
    const performanceConfig = fileSystem.readFileAsync(path.join(__dirname, 'performance_small.json'));
    return JSON.parse(performanceConfig);
}

function runTestFromConfig(config) {
    return config.features.reduce(
      (promise, feature) => {
          return promise.then(result =>
            testRunner(feature, config.volume).then(currentResult => {
                  return [...result, {
                      types: feature.name,
                      result: currentResult
                  }]
              }
            )
          );
      },
      Promise.resolve([])
    );
}
