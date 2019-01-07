const transformers = require('./transformer.1');

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
                            transformers.transformer(program)
                        ]
                    })
                }
            }
        ]
    }
};