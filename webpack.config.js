const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'

const config = {
    entry: './src/app.jsx',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: WEBPACK_ENV === 'online' ? '//s.minjie.shop/admin-v2-fe/dist/' : '/dist/',
        filename: 'js/app.js'
    },

    module: {
        rules: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                use: 'css-loader',
                fallback: 'style-loader'
            })
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({
                use: 'css-loader!sass-loader',
                fallback: 'style-loader'
            })
        }, {
            test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            use: [{
                loader: 'url-loader',
                options: {
                    name: 'resource/[name].[ext]',
                    limit: 2000
                }
            }]
        }, {
            test: /\.jsx$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react']
                }
            }
        }]
    },

    resolve: {
        alias: {
            node_modules: path.join(__dirname, '/node_modules'),
            util: path.join(__dirname, '/src/util'),
            component: path.join(__dirname, '/src/component'),
            service: path.join(__dirname, '/src/service'),
            page: path.join(__dirname, '/src/page')
        }
    },

    devServer: {
        port: '8086',
        historyApiFallback: {
            index: '/dist/index.html'
        },
        proxy: {
            '/manage': {
                target: 'http://admintest.happymmall.com/',
                changeOrigin: true
            },
            '/user/logout.do': {
                target: 'http://admintest.happymmall.com/',
                changeOrigin: true
            }
        }
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),

        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            favicon: './favicon.ico'
        }),

        new ExtractTextPlugin('css/[name].css')
    ]
}

module.exports = config
