// 自带的库
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js',
    },

    devtool: 'inline-source-map',
    output: {
        filename: "js/[name].bundle.js",
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: './dist',   // 不写也能正常运行
        hot: true
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: ['file-loader']
            },
            {
                test: /\.(js|jsx|mjs)$/,
                loader: 'babel-loader',
                include: [path.resolve(__dirname, 'src')]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'output test',
            template: 'index.html'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}
