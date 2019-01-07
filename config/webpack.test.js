const keysTransformer = require('./transformer.1').default;

module.exports = {
    mode: "development",
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