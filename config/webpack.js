/*globals module, require */

module.exports = {
    mode: "production",
    module: {
        rules: [
            {
                test: /\.ts?$/,
                loader: "ts-loader"
            }
        ]
    },
    entry: {
        app: ['./index.ts']
    },
    output: {
        filename: "index.js",
        libraryTarget: "umd"
    },
    resolve: {
        extensions: ['.ts', ".js"]
    },
    plugins: []
};
