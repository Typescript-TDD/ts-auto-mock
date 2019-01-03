const keysTransformer = require('./transformer').default;

module.exports = {
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                options: {
                    getCustomTransformers: program => ({
                        before: [
                            keysTransformer(program)
                        ]
                    })
                }
            }
        ]
    }
};