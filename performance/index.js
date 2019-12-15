const path = require('path');
const fileSystem = require('./core/fs/fileSystem');
const gitHelper = require('./core/git/gitHelper');
const testRunner = require('./testRunner/testRunner');

function getPerformanceConfig() {
    const performanceConfig = fileSystem.readFileAsync(path.join(__dirname, 'performance.json'));
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

async function addResultToData(testResults, dataFileJson, now) {
    const currentBranch = await gitHelper.getCurrentBranchName();
    const currentCommit = await gitHelper.getCurrentCommit();

    if (dataFileJson[currentBranch]) {
        if (dataFileJson[currentBranch][currentCommit]) {
            dataFileJson[currentBranch][currentCommit][now] = testResults;
        } else {
            dataFileJson[currentBranch][currentCommit] = {
                [now]: testResults
            }
        }
    } else {
        dataFileJson[currentBranch] = {
            [currentCommit]: {
                [now]: testResults
            }
        }
    }
}

(async function () {
    const config = getPerformanceConfig();
    const testResults = await runTestFromConfig(config);

    const dataAppFilePath = path.join(__dirname, 'app', 'src', 'result', 'data.json');
    const dataFile = fileSystem.readFileAsync(dataAppFilePath);
    const dataFileJson = JSON.parse(dataFile);

    const now = new Date().toISOString();

    await addResultToData(testResults, dataFileJson, now);

    const backUpDataFile = path.join(__dirname, 'backup', `data${now}.json`);
    const dataForFile = JSON.stringify(dataFileJson);

    fileSystem.writeFileAsync(dataAppFilePath, dataForFile);
    fileSystem.writeFileAsync(backUpDataFile, dataForFile);
})();



