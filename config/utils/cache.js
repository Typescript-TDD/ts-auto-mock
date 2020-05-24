const ProcessService = require('../../utils/process/process');

function DetermineCacheBetweenTestsFromDebugEnvironment() {
    const processService = ProcessService(process);
    return processService.getEnvironmentValue('CACHE');
}
module.exports = DetermineCacheBetweenTestsFromDebugEnvironment;