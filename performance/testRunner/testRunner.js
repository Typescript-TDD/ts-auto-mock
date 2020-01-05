const path = require('path');
const fileSystem = require('../core/fs/fileSystem');
const typescriptRunner = require('./typescriptRunner');

function getDistPerformanceFolder() {
    return path.join(__dirname, "..", "dist-performance");
}

async function testRunner(feature, volume) {
    console.log(`running ${feature.name}`);
    const performanceTestFolder = getDistPerformanceFolder();
    await fileSystem.createFolder(performanceTestFolder);
    await generateFeatureTests(feature, volume);

    const testResults = await typescriptRunner.run(feature.tsConfig);
    await fileSystem.deleteFolder(performanceTestFolder);

    console.log(`finished ${feature.name}`);
    return testResults;
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

function testForFeature(feature, volume) {
    const performanceTestFolder = getDistPerformanceFolder();
    const templateFolder = path.join(__dirname, "..", "templates");

    for (let i = 0; i < volume; i++) {
        const filePath = path.join(performanceTestFolder, `${feature}${i}.test.ts`);
        const testFile = fileSystem.readFileSync(path.join(templateFolder, `${feature}.ts`));
        fileSystem.writeFileSync(filePath, testFile);
    }
}

module.exports = testRunner;
