
const path = require('path');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const isAnalyze = process.argv.includes('--analyze') || process.argv.includes('--analyse');
const isDebug = !process.argv.includes('--release');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
    },

    // Choose a developer tool to enhance debugging
    // https://webpack.js.org/configuration/devtool/#devtool
    devtool: isDebug ? 'inline-source-map' : 'source-map',
    output: {
        filename: "js/[name].bundle.js",
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: '[name].chunk.js',
        publicPath: "/"
    },


    resolve: {
        // 指定第三方库目录，减少webpack寻找时间
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

        // 使用了react-hot-loader而不是webpack的HMR
        // new webpack.NamedModulesPlugin(),
        // new webpack.HotModuleReplacementPlugin(),    // 加了这个之后HMR异常！！！可能是和react-hot-loader冲突了吧


        ...(isDebug ?
            [
                new webpack.NamedModulesPlugin(),
            ]
            : []),

        // Webpack Bundle Analyzer
        // https://github.com/th0r/webpack-bundle-analyzer
        ...(isAnalyze ? [new BundleAnalyzerPlugin()] : []),
    ],

    // Move modules that occur in multiple entry chunks to a new entry chunk (the commons chunk).
    optimization: {
        minimize: !isDebug,
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                },
            },
        },
    },

    ...(isDebug ?
        {

            devServer: isDebug ? {
                // https://webpack.js.org/configuration/dev-server/#devserver-historyapifallback
                // When using the HTML5 History API, the index.html page will likely have to be served in place of any 404 responses.Enable this by passing true
                historyApiFallback: true,

                contentBase: path.join(__dirname, 'dist'),   // 不写也能正常运行
                hot: true,
                port: 9000
            } : null,
        }
     : [])
}
