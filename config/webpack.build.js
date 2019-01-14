/*globals module, require */

module.exports = {
    mode: "production",
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    entry: {
        index: ['./index.ts'],
    },
    output: {
        libraryTarget: "commonjs",
        filename: "[name].js"
    }
};
