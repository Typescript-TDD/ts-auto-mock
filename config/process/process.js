function ProcessService(process) {
    const processArguments = process.argv;

    return {
        getArgument(argumentName) {
            let valueToFind = '';
            processArguments.forEach((argument) => {
                const values = argument.split('=');
                if (argumentName === values[0])
                    valueToFind =  values[1];
            });

            return valueToFind;
        }
    }
}

module.exports = ProcessService;
