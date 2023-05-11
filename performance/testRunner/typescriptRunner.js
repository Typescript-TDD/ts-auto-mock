const execPromise = require('../core/exec/execPromise');

const typescriptDiagnosticMap = {
    "Files": "files",
    "Lines": "lines",
    "Nodes": "nodes",
    "Identifiers": "identifiers",
    "Symbols": "symbols",
    "Types": "types",
    "Memory used": "memory_used",
    "I/O read": "i/o_read",
    "I/O write": "i/o_write",
    "Parse time": "parse_time",
    "Bind time": "bind_time",
    "Check time": "check_time",
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
        run(tsConfig) {
            return execPromise(`tspc --project ${tsConfig}`).then((result) => {
                return parseTypescriptDiagnostic(result);
            }).catch((error) => {
                console.error(error);
                process.exit(1);
            });
        }
    }
}

module.exports = typescriptRunner();
