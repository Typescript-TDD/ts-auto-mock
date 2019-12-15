const execPromise = require('../core/exec/execPromise');

const typescriptDiagnosticMap = {
    "Files": "files",
    "Lines": "lines",
    "Nodes": "nodes",
    "Identifiers": "identifiers",
    "Symbols": "symbols",
    "Types": "types",
    "Memory used": "memory_used",
    "I/O Read time": "i/o_Read time",
    "Parse time": "parse_time",
    "Program time": "program_time",
    "Bind time": "bind_time",
    "Check time": "check_time",
    "transformTime time": "transformTime",
    "commentTime time": "commentTime_time",
    "I/O Write time": "i/o_write_time",
    "printTime time": "printTime_time",
    "Emit time": "emit_time",
    "Total time": "total_time",
};

function parseTypescriptDiagnostic(result) {
    const lines = result.split('\n');

    return lines.reduce((acc, line) => {
        const splitLine = line.split(':');
        const title = splitLine[0].trim();
        const value = splitLine[1].trim();
        const mappedKey = typescriptDiagnosticMap[splitLine[0].trim()];
        acc[mappedKey] = {
            title: title,
            value: convertTime(value)
        };

        return acc;
    }, {});
}

function convertTime(time) {
    return time.replace('s', '');
}

function typescriptRunner() {
    return {
        async run(tsConfig) {
            const result = await execPromise(`ttsc --project ${tsConfig}`);
            return parseTypescriptDiagnostic(result);
        }
    }
}

module.exports = typescriptRunner();
