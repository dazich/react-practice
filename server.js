
const Koa = require('koa');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = new Koa();
const config = require('./webpack.config');
const compiler = webpack(config);


// app.use((ctx, next) => {
//     webpackDevMiddleware(compiler, {
//         publicPath: config.output.publicPath
//     });
//     next();
// })
//
// app.listen(3000, () => {
//     console.log('Example app listening on port 3000!\n');
// })