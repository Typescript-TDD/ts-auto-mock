function multiProcessOutput() {
    const outputData = {};

    return {
        generateOutput() {
            const realOutput = [];

            const processesOutput = Object.keys(outputData);

            for(let i = 0; i < processesOutput.length; i++) {
                const processOutput = outputData[processesOutput[i]];
                const itemsProcessed = Object.keys(processOutput);

                for(let j = 0; j < itemsProcessed.length; j++) {
                    const itemOutput = processOutput[itemsProcessed[j]];

                    realOutput.push({ item: itemsProcessed[j], ...itemOutput });
                }
            }

            return realOutput;
        },
        addData(processId, itemId, itemData) {
            outputData[processId] = outputData[processId] || {};
            outputData[processId][itemId] = itemData;
        }
    };
}

module.exports = {
    createNew() {
        return multiProcessOutput();
    }
};
