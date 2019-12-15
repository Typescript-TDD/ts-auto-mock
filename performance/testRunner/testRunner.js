const path = require('path');
const fileSystem = require('../core/fs/fileSystem');
const typescriptRunner = require('./typescriptRunner');

function getDistPerformanceFolder() {
    return path.join(__dirname, "..", "dist-performance");
}

async function testRunner(feature, volume) {
    const performanceTestFolder = getDistPerformanceFolder();
    await fileSystem.createFolder(performanceTestFolder);
    await generateFeatureTests(feature, volume);

    const testResults = await typescriptRunner.run(feature.tsConfig);
    await fileSystem.deleteFolder(performanceTestFolder);

    return testResults;
}

function testForFeature(feature, volume) {
    const performanceTestFolder = getDistPerformanceFolder();
    const templateFolder = path.join(__dirname, "..", "templates");

    for (let i = 0; i < volume; i++) {
        const filePath = path.join(performanceTestFolder, `${feature}${i}.test.ts`);
        const testFile = fileSystem.readFileAsync(path.join(templateFolder, `${feature}.ts`));
        fileSystem.writeFileAsync(filePath, testFile);
    }
}


async function generateFeatureTests(featureConfig, volume) {
    const performanceTestFolder = getDistPerformanceFolder();
    const templateFolder = path.join(__dirname, "..", "templates");

    const numberOfTestsForFeature = volume / featureConfig.types.length;

    featureConfig.types.forEach((featureType) => {
        testForFeature(featureType, numberOfTestsForFeature);
    });

    const typesFolder = path.join(templateFolder, "types");
    const performanceTestTypesFolder = path.join(performanceTestFolder, "types");
    await fileSystem.copyFolder(typesFolder, performanceTestTypesFolder);
}
module.exports = testRunner;
