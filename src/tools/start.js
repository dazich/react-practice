
import Koa from 'koa';
import path from 'path';
import webpack from 'webpack';
import webpackConfig from '../../webpack.config';
import run, { format } from './run';

const isDebug = !process.argv.includes('--release');


async function start() {
    // TODO 1.开发模式下启动webpack-dev-middleware，需要一个新的server来处理这个middleware并把老server也当middleware加进去，开发环境则不需要。
    const startTime = new Date().getTime();
    const server = new Koa();


}