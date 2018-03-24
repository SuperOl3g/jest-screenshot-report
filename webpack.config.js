const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

const OUT_DIR = 'lib';
const BUNDLE_FILENAME = 'bundle.js';

const isProductionBuild = process.env.NODE_ENV === 'production';


module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, OUT_DIR),
        filename: BUNDLE_FILENAME
    },
    mode: isProductionBuild ? 'production' : 'development',
    devtool: !isProductionBuild && 'cheap-module-eval-source-map',
    module: {
        rules: [
            { test: /\.jade$/, loader: 'jade-loader' },
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
                            localIdentName: isProductionBuild ? '[hash:base64:5]' : '[name]__[local]_[hash:base64:5]',
                            importLoaders: 1,
                        },
                    },
                    isProductionBuild ? {
                        loader: 'csso-loader',
                        options: {
                            comments: false
                        }
                    } : {},
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
        }),
        new HtmlWebpackPlugin({
            inject: false,
            title: 'Test report',
            template: 'src/page-template.jade'
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),       // убираем лишние локали у momentJS
        new WebpackShellPlugin(isProductionBuild && {
            onBuildEnd: [`rm ${path.resolve(OUT_DIR, BUNDLE_FILENAME)}`]
        }),
    ]
};