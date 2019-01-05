const keysTransformer = require('./transformer.1').default;

module.exports = {
    mode: "development",
    resolve: {
        extensions: ['.ts', '.js']
    },
    entry: {
        app: ['./index.ts']
    },
    output: {
        filename: "index.js",
        libraryTarget: "umd"
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