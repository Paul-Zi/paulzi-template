const fs = require('fs');
const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCss = new ExtractTextPlugin('../css/[name].css');
const extractTmp = new ExtractTextPlugin('../tmp/pug.tmp');

let entries = {};
fs.readdirSync('./src/entries').forEach(file => {
    entries[path.basename(file, '.js')] = './src/entries/' + file;
});

module.exports = target => { return {
    entry: entries,
    stats: {
        children: false,
        modules: false,
        entrypoints: false,
        hash: false,
    },
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
                            presets: ['env']
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '../i/[hash].[ext]',
                        },
                    }
                ]
            },
            {
                test: /\.css$/,
                use: extractCss.extract([
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            minimize: target === 'prod'
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                autoprefixer(),
                            ],
                            sourceMap: true
                        }
                    }
                ])
            },
            {
                test: /\.scss$/,
                use: extractCss.extract([
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            minimize: target === 'prod'
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                autoprefixer(),
                            ],
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
            },
            {
                test: /\.pug$/,
                use: extractTmp.extract([
                    {
                        loader: 'file-loader',
                        options: {
                            name: "[name].html",
                            outputPath: '../'
                        }
                    },
                    {
                        loader: 'pug-html-loader',
                        options: {
                            pretty: true
                        }
                    }
                ]),
            },
        ]
    },
    externals: {
        "jquery": "jQuery"
    },
    plugins: [
        extractCss,
        extractTmp,
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        }
    }
}};