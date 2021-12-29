const ProcessService = require('../../utils/process/process');

function DetermineDevToolFromDebugEnvironment() {
    const processService = ProcessService(process);
    const debug = processService.getEnvironmentValue('DEBUG');
    return debug ? "eval-cheap-module-source-map": undefined;
}
module.exports = DetermineDevToolFromDebugEnvironment;