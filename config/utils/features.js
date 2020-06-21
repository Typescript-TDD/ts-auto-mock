const ProcessService = require('../../utils/process/process');

function DetermineFeaturesFromEnvironment() {
    const processService = ProcessService(process);
    const features = processService.getEnvironmentValue('FEATURES');

    if (features) {
       return [
           'overloads',
           'random',
       ];
    }

    return [];
}
module.exports = DetermineFeaturesFromEnvironment;
