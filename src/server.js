/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import express from 'express';
// import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';
// import expressJwt, { UnauthorizedError as Jwt401Error } from 'express-jwt';
// import { graphql } from 'graphql';
// import expressGraphQL from 'express-graphql';
// import jwt from 'jsonwebtoken';
import nodeFetch from 'node-fetch';
import React from 'react';
import { StaticRouter } from 'react-router';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
// import createFetch from './createFetch';
// import assets from './asset-manifest.json'; // eslint-disable-line import/no-unresolved
import chunks from './chunk-manifest.json'; // eslint-disable-line import/no-unresolved
// import config from './config';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Route, Switch, matchPath } from "react-router-dom";
import App from './App';
import rootReducer from './reducers'
import routes from './routes';

const store = createStore(rootReducer)

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = route => (
    <Route
        path={route.path}
        render={props => (
            // pass the sub-routes down to keep nesting
            <route.component {...props} routes={route.routes} />
        )}
    />
);

process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at:', p, 'reason:', reason);
    // send entire app down. Process manager will restart it
    process.exit(1);
});

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

const app = express();

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
    try {
        const css = new Set();

        // Enables critical path CSS rendering
        // https://github.com/kriasoft/isomorphic-style-loader
        const insertCss = (...styles) => {
            // eslint-disable-next-line no-underscore-dangle
            styles.forEach(style => css.add(style._getCss()));
        };

        // Universal HTTP client
        // const fetch = createFetch(nodeFetch, {
        //   baseUrl: config.api.serverUrl,
        //   cookie: req.headers.cookie,
        //   schema,
        //   graphql,
        // });

        // Global (context) variables that can be easily accessed from any React component
        // https://facebook.github.io/react/docs/context.html
        const context = {
            // insertCss,
            // fetch,
            // The twins below are wild, be careful!
            pathname: req.path,
            query: req.query,
        };

        const data = {};
        data.children = ReactDOM.renderToString(
            <Provider store={store}>
                <StaticRouter
                    location={req.url}
                    context={context}
                >
                    <App/>
                </StaticRouter>
            </Provider>
        );
        // data.styles = [{ id: 'css', cssText: [...css].join('') }];

        const scripts = new Set();
        const addChunk = chunk => {
          if (chunks[chunk]) {
            chunks[chunk].forEach(asset => scripts.add(asset));
          } else if (__DEV__) {
            throw new Error(`Chunk with name '${chunk}' cannot be found`);
          }
        };
        addChunk('client');
        // if (route.chunk) addChunk(route.chunk);
        // if (route.chunks) route.chunks.forEach(addChunk);
        // data.scripts = Array.from(scripts);

        // data.app = {
        //   apiUrl: config.api.clientUrl,
        // };

        const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);

        // inside a request
        const promises = []
// use `some` to imitate `<Switch>` behavior of selecting only
// the first to match
        routes.some(route => {
            // use `matchPath` here
            // console.info('route',route)
            const match = matchPath(req.path, route)
            if (match)
                promises.push(route.loadData(match))
            return match
        })

        Promise.all(promises).then(data => {
            // do something w/ the data so the client
            // can access it then render the app
        })
        // res.status(route.status || 200);
        res.send(`<!doctype html>${html}`);
    } catch (err) {
        next(err);
    }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error(pe.render(err));
    const html = ReactDOM.renderToStaticMarkup(
        <Html
            title="Internal Server Error"
            description={err.message}
            styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
        >
        {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
        </Html>,
    );
    res.status(err.status || 500);
    res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
// const promise = models.sync().catch(err => console.error(err.stack));
if (!module.hot) {
    // promise.then(() => {
    app.listen(3000, () => {
        console.info(`The server is running at http://localhost:3000/`);
    });
    // });
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
// if (module.hot) {
//   app.hot = module.hot;
//   module.hot.accept('./router');
// }

export default app;
