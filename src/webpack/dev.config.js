const merge = require('webpack-merge');
const common = require('./common.config.js');

module.exports = merge(common, {
    devtool: "cheap-module-source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'eslint-loader',
                    options: {
                        enforce: "pre"
                    }
                }
            }
        ]
    },
});