'use strict';
const webpack = require('webpack');
module.exports = {
    context: __dirname + '/webapp',
    entry: './builder',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.min.js'
    },
    devtool: ['source-map'],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            }
        ]
    },
    plugins: process.env.NODE_ENV === 'production' ? [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ] : []
};