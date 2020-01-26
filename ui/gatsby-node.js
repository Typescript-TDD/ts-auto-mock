const WebpackCopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');

exports.onCreateWebpackConfig = ({
                                     stage,
                                     rules,
                                     loaders,
                                     plugins,
                                     actions,
                                 }) => {

    actions.setWebpackConfig({
        plugins: [
            new WebpackCopyPlugin([
                {
                    from: path.resolve('..', '..', 'data'),
                    to: 'resources'
                },
                {
                    from: path.resolve('..', '_config.yml'),
                    to: ''
                }
            ]),
            new Dotenv()
        ],
    });
};
