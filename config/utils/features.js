const ProcessService = require('../../utils/process/process');

function DetermineFeaturesFromEnvironment() {
    const processService = ProcessService(process);
    const random = processService.getEnvironmentValue('RANDOM')
    const features = [];

    if (random) {
       features.push('random')
    }
    return features;
}
module.exports = DetermineFeaturesFromEnvironment;