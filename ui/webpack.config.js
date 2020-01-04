const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
            extensions: ['.ts', '.tsx', '.js', '.json']
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
            new HtmlWebpackPlugin({
                template: 'src/index.html'
            })
        ]
    }
};
