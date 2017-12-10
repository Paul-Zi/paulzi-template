const fs = require('fs');
const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCss  = new ExtractTextPlugin('../css/[name].css');
const extractHtml = new ExtractTextPlugin('../[name].html');

let browsers = [
    '> 1%',
    'last 2 versions',
    'last 4 Chrome versions',
    'last 4 Firefox versions',
    'not ie < 11',
    'Safari >= 9',
    'Android >= 4.4',
    'iOS >= 7.1'
];

let entries = {};
fs.readdirSync('./src/entries').forEach(file => {
    entries[path.basename(file, '.js')] = './src/entries/' + file;
});

module.exports = {
    entry: entries,
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../../js')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [['env', {
                                targets: {
                                    browsers: browsers
                                }
                            }]]
                        }
                    }
                ]
            },
            {
                test: /\.pug$/,
                use: extractHtml.extract([
                    {
                        loader: 'raw-loader',
                    },
                    {
                        loader: 'pug-html-loader',
                        options: {
                            pretty: true
                        }
                    }
                ]),
            },
            {
                test: /\.scss$/,
                use: extractCss.extract([
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: function () {
                                return [
                                    autoprefixer({
                                        browsers: browsers
                                    })
                                ];
                            },
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ])
            }
        ]
    },
    externals: {
        "jquery": "jQuery"
    },
    plugins: [
        extractCss,
        extractHtml,
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        /* new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'app',
            chunks: Object.keys(entries).filter(item => item !== 'vendor'),
            minChunks: Infinity
        }), */
    ]
};