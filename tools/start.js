
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import browserSync from 'browser-sync';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config';
import run, { format } from './run';
import clean from './clean';

const isDebug = !process.argv.includes('--release');

function createCompilationPromise(name, compiler, config) {
    return new Promise(((resolve, reject) => {
        let timeStart = new Date();
        compiler.hooks.compile.tap(name, () => {
            timeStart = new Date();
            console.info(`[${format(timeStart)}] Compiling '${name}'...`)
        })

        compiler.hooks.done.tap(name, stats => {
            console.info(`${name} compiler stats: ${stats.toString()}`)
            const timeEnd = new Date();
            const time = timeEnd.getTime() - timeStart.getTime();
            if (stats.hasErrors()) {
                console.info(
                    `[${format(timeEnd)}] Failed to compile '${name}' after ${time} ms`,
                );
                reject(new Error('Compilation failed!'));
            } else {
                console.info(
                    `[${format(
                        timeEnd,
                    )}] Finished '${name}' compilation after ${time} ms`,
                );
                resolve(stats);
            }
        })
    }))
}

async function start() {
    // TODO 1.开发模式下启动webpack-dev-middleware，需要一个新的server来处理这个middleware并把老server也当middleware加进去，生产环境则不需要。
    const startTime = new Date().getTime();

    let server = express();
    // server.use(express.static(path.resolve(__dirname, '../public')));

    // client
    const clientConfig = webpackConfig.find(config => config.name === 'client');
    // TODO
    clientConfig.module.rules = clientConfig.module.rules.filter(
        x => x.loader !== 'null-loader',
    );

    // 开发模式下才配置HMR
    clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

    // server
    const serverConfig = webpackConfig.find(config => config.name === 'server');
    // serverConfig.output.hotUpdateMainFilename = 'updates/[hash].hot-update.json';
    // serverConfig.output.hotUpdateChunkFilename = 'updates/[id].[hash].hot-update.js';
    serverConfig.module.rules = serverConfig.module.rules.filter(
        x => x.loader !== 'null-loader',
    );
    serverConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

    // 开始打包
    await run(clean);
    const multiCompiler = webpack(webpackConfig);
    const clientCompiler = multiCompiler.compilers.find(
        compiler => compiler.name === 'client',
    );
    const serverCompiler = multiCompiler.compilers.find(
        compiler => compiler.name === 'server',
    );
    const clientPromise = createCompilationPromise(
        'client',
        clientCompiler,
        clientConfig,
    );
    const serverPromise = createCompilationPromise(
        'server',
        serverCompiler,
        serverConfig,
    );

    // https://github.com/webpack/webpack-dev-middleware
    server.use(
        webpackDevMiddleware(clientCompiler, {
            publicPath: clientConfig.output.publicPath,
            logLevel: 'silent',
            // TODO
            // watchOptions,
        }),
    );

    // https://github.com/glenjamin/webpack-hot-middleware
    server.use(webpackHotMiddleware(clientCompiler, { log: false }));


    // TODO
    let appPromise;
    let appPromiseResolve;
    let appPromiseIsResolved = true;
    serverCompiler.hooks.compile.tap('server', () => {
        if (!appPromiseIsResolved) return;
        appPromiseIsResolved = false;
        // eslint-disable-next-line no-return-assign
        appPromise = new Promise(resolve => (appPromiseResolve = resolve));
    });


    // TODO
    // function checkForUpdate(fromUpdate) {
    //     const hmrPrefix = '[\x1b[35mHMR\x1b[0m] ';
    //     if (!app.hot) {
    //         throw new Error(`${hmrPrefix}Hot Module Replacement is disabled.`);
    //     }
    //     if (app.hot.status() !== 'idle') {
    //         return Promise.resolve();
    //     }
    //     return app.hot
    //         .check(true)
    //         .then(updatedModules => {
    //             if (!updatedModules) {
    //                 if (fromUpdate) {
    //                     console.info(`${hmrPrefix}Update applied.`);
    //                 }
    //                 return;
    //             }
    //             if (updatedModules.length === 0) {
    //                 console.info(`${hmrPrefix}Nothing hot updated.`);
    //             } else {
    //                 console.info(`${hmrPrefix}Updated modules:`);
    //                 updatedModules.forEach(moduleId =>
    //                     console.info(`${hmrPrefix} - ${moduleId}`),
    //                 );
    //                 checkForUpdate(true);
    //             }
    //         })
    //         .catch(error => {
    //             if (['abort', 'fail'].includes(app.hot.status())) {
    //                 console.warn(`${hmrPrefix}Cannot apply update.`);
    //                 delete require.cache[require.resolve('../build/server')];
    //                 // eslint-disable-next-line global-require, import/no-unresolved
    //                 app = require('../build/server').default;
    //                 console.warn(`${hmrPrefix}App has been reloaded.`);
    //             } else {
    //                 console.warn(
    //                     `${hmrPrefix}Update failed: ${error.stack || error.message}`,
    //                 );
    //             }
    //         });
    // }
    //
    // serverCompiler.watch(watchOptions, (error, stats) => {
    //     if (app && !error && !stats.hasErrors()) {
    //         checkForUpdate().then(() => {
    //             appPromiseIsResolved = true;
    //             appPromiseResolve();
    //         });
    //     }
    // });

    // Wait until both client-side and server-side bundles are ready
    await clientPromise;
    await serverPromise;

    const timeStart = new Date();
    console.info(`[${format(timeStart)}] Launching server...`);

    let app = require('../build/server').default;
    server.use((req, res) => {
        appPromise
            .then(() => app.handle(req, res))
            .catch(error => console.error(error));
    });

    // TODO
    appPromiseIsResolved = true;
    appPromiseResolve();

    // Launch the development server with Browsersync and HMR
    await new Promise((resolve, reject) =>
      browserSync.create().init(
        {
          // https://www.browsersync.io/docs/options
          server: 'src/server.js',
          middleware: [server],
          open: false && !process.argv.includes('--silent'),
          ...(isDebug ? {} : { notify: false, ui: false }),
        },
        (error, bs) => (error ? reject(error) : resolve(bs)),
      ),
    );

    // TODO
    // server.listen(8888, () => {console.info('listening at 8888...')})

    const timeEnd = new Date();
    const time = timeEnd.getTime() - timeStart.getTime();
    console.info(`[${format(timeEnd)}] Server launched after ${time} ms`);
    return server;
}

export default start;