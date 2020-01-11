function maximiseParallelRun(processesCount, totalItems) {
    const processes = [];
    const newProcessesCount = Math.min(totalItems, processesCount);
    const floored = Math.floor(totalItems / newProcessesCount);
    let remaining = totalItems;

    for(let i = 0; i < newProcessesCount; i++) {
        processes.push({
            items: Math.min(floored, remaining)
        });

        remaining -= floored;
    }

    return processes;
}

module.exports = maximiseParallelRun;
