function maximiseParallelRun(processesCount, totalItems) {
    const processes = [];
    const floored = Math.floor(totalItems / processesCount);
    let remaining = totalItems;

    for(let i = 0; i < processesCount; i++) {
        processes.push({
            items: Math.min(floored, remaining)
        });

        remaining -= floored;
    }

    return processes;
}

module.exports = maximiseParallelRun;
