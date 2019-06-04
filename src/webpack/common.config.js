const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let entries = {};
fs.readdirSync('./src/entries').forEach(file => {
    entries[path.basename(file, '.js')] = './src/entries/' + file;
});


module.exports = {
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
                            presets: ['@babel/preset-env']
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
                test: /\.(css|scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            config: {
                                path: path.resolve(__dirname, './postcss.config.js'),
                            },
                        },
                    }
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            precision: 8
                        }
                    }
                ],
            },
            {
                test: /\.pug$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "[name].html",
                            outputPath: '../'
                        }
                    },
                    {
                        loader: "pug-html-loader",
                        options: {
                            "pretty":true
                        }
                    }
                ],
            },
        ]
    },
    /*
    externals: {
        "jquery": "jQuery"
    },
    */
    plugins: [
        new MiniCssExtractPlugin({filename: '../css/[name].css'}),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
    ],
    /*
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
    */
};