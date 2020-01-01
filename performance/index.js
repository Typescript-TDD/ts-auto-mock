const path = require('path');
const fileSystem = require('./core/fs/fileSystem');
const gitHelper = require('./core/git/gitHelper');
const testRunner = require('./testRunner/testRunner');
const performanceRepository = require("./repository/repository");

(async function () {
    const secret = process.argv[2];
    const config = getPerformanceConfig();
    const testResults = await runTestFromConfig(config);

    const currentCommit = await gitHelper.getCurrentCommit();
    const currentBranch = await gitHelper.getCurrentBranchNameFromCommit();

    const url = "https://api.jsonbin.io/b/5e0cc11f32536c77d679a2e3";
    const publicUrl = "https://api.jsonbin.io/b/5e0ccffff9369177b27624ce";

    performanceRepository(url, secret).update(testResults, currentBranch, currentCommit);
    performanceRepository(publicUrl).update(testResults, currentBranch, currentCommit);
})();

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
