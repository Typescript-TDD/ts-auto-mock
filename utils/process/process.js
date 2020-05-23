function ProcessService(process) {
    const argumentMap = getArguments();

    return {
        getArgument(argumentName) {
            const argument = argumentMap[argumentName];

            return argument === undefined ? '' : argument;
        },
        ensureArgumentsValidity(acceptedArguments) {
            const acceptedArgumentsMap = {};

            for (let i = 0; i < acceptedArguments.length; i++) {
                acceptedArgumentsMap[acceptedArguments[i]] = true;
            }

            const passedArgumentNames = Object.keys(argumentMap);
            for (let i = 0; i < passedArgumentNames.length; i++) {
                if (!acceptedArgumentsMap[passedArgumentNames[i]]) {
                    throw new Error(`Argument ${passedArgumentNames[i]} is not accepted, only available arguments are ${acceptedArguments.join(', ')}`)
                }
            }
        },
        getEnvironmentValue(envKey) {
            const environmentVariables = process.env;

            return convertToBooleanWhenTrueOrFalse(environmentVariables[envKey]);
        }
    };

    function convertToBooleanWhenTrueOrFalse(maybeBoolean) {
        if (maybeBoolean === 'true') {
            return true;
        }

        if (maybeBoolean === 'false') {
            return false;
        }

        return maybeBoolean;
    }

    function getArguments() {
        const processArguments = process.argv.slice(2);
        const map = {};

        for(let i = 0; i < processArguments.length; i++) {
            const values = processArguments[i].split('=');

            map[values[0]] = values[1];
        }

        return map;
    }
}

module.exports = ProcessService;
