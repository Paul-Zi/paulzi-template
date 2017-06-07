const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: './src/js/app.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'js')
    },
    devtool: "cheap-module-source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.pug$/,
                loader: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '../[name].html'
                        }
                    },
                    {
                        loader: 'pug-html-loader',
                        options: {
                            pretty: true
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract([
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
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
                                        browsers: [
                                            'last 2 versions',
                                            'last 4 Chrome versions',
                                            'last 4 Firefox versions',
                                            'Explorer >= 11',
                                            'Safari >= 9',
                                            'Android >= 4.4',
                                            'iOS >= 7.1'
                                        ]
                                    })
                                ];
                            },
                            sourceMap: true
                        }
                    }
                ])
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('../css/[name].css')
    ]
};