const merge = require('webpack-merge');
const common = require('./common.config.js');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
    //devtool: "source-map",
    plugins: [
        new UglifyJSPlugin({
            //sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
});