/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var webpack = require("webpack");
const ROOT_DIR = path.resolve(__dirname, '.');
const BUILD_DIR = path.join(ROOT_DIR, 'static');
module.exports = {
    entry: [
        './src/index.js',
        './styles/main.scss',
    ],
    output: {
        path: BUILD_DIR,
        filename: 'js/[name].bundle.js',
        chunkFilename: 'js/[name].[hash].js',
        publicPath: '/static/',
    },
    devServer: {
        contentBase: BUILD_DIR,
        port: 9001,
        stats: "minimal",
        publicPath: '/static/',
        watchContentBase: false,
        historyApiFallback: true,
        open: false,
        hot: false
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                            },
                        },
                        {
                            loader: 'sass-loader',
                        },
                    ],
                }),
            },
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/react', '@babel/env'],
                    plugins: ['@babel/plugin-proposal-class-properties']
                },
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: "url-loader?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                use: "url-loader?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: "url-loader?limit=10000&mimetype=application/octet-stream"
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: "file-loader"
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: "url-loader?limit=10000&mimetype=image/svg+xml"
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: [
                    'file-loader?name=img/compiled/[name].[ext]',
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(['js'], {
            root: path.join(__dirname, '../static'),
            watch: true,
        }),
        new ExtractTextPlugin('css/main.css'),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};
