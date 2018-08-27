// 自带的库
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const isDebug = !process.argv.includes('--release');

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js',
    },

    devtool: 'inline-source-map',
    output: {
        filename: "js/[name].bundle.js",
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: '[name].bundle.js',
        publicPath: "/"
    },
    devServer: {
        // https://webpack.js.org/configuration/dev-server/#devserver-historyapifallback
        // When using the HTML5 History API, the index.html page will likely have to be served in place of any 404 responses.Enable this by passing true
        historyApiFallback: true,

        contentBase: path.join(__dirname, 'dist'),   // 不写也能正常运行
        hot: true,
        port: 9000
    },

    resolve: { // 指定第三方库目录，减少webpack寻找时间
        modules: [path.resolve(__dirname, './node_modules')],
    },

    module: {
        rules: [
            {
                test: /\.(css|less|styl|scss|sass|sss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: './postcss.config.js',
                            },
                        },
                    },
                ]
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
        // new webpack.HotModuleReplacementPlugin(),    // 加了这个之后HMR！！！可能是和react-hot-loader冲突了吧
    ],

    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             commons: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 name: "vendors",
    //                 chunks: "all"
    //             }
    //         }
    //     }
    // }
}
