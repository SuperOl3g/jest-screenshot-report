const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'bundle.js'
    },
    mode: process.env.NODE_ENV,
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    'presets': [
                        'es2015',
                        'react',
                        'stage-0'
                    ]
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: false,
                            modules: true,
                            localIdentName: '[name]__[local]_[hash:base64:5]',
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            }
        })
    ]
};