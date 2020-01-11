const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = function () {
    return {
        entry: './src/index.tsx',
        optimization: {
            splitChunks: {
                chunks: "all",
            }
        },
        output: {
            path: path.resolve(__dirname, 'dist')
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json', '.d.ts']
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader"
                    ]
                },
                {
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new WebpackCopyPlugin([
                {
                    from: '../data',
                    to: 'resources'
                },
                {
                    from: '_config.yml',
                    to: ''
                }
            ]),
            new HtmlWebpackPlugin({
                template: 'src/index.html'
            })
        ]
    }
};
