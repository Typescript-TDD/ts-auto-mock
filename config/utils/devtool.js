const ProcessService = require('../../utils/process/process');

function DetermineDevToolFromDebugEnvironment() {
    const processService = ProcessService(process);
    const debug = processService.getEnvironmentValue('DEBUG');
    return debug ? "cheap-module-eval-source-map": undefined;
}
module.exports = DetermineDevToolFromDebugEnvironment;