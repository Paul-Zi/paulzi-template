const merge = require('webpack-merge');
const common = require('./common.config.js');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common('prod'), {
    //devtool: "source-map",
    plugins: [
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
        new UglifyJSPlugin({
            //sourceMap: true
            uglifyOptions: {
                output: {
                    comments: false
                }
            }
        }),
    ],
    mode: 'production',
});