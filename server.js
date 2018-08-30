
import { createServer } from 'http'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'

import { Provider } from 'react-redux'
import { createStore } from 'redux'

import rootReducer from './src/reducers'

const store = createStore(rootReducer)
import App from './src/App'

createServer((req, res) => {
    const context = {}

    const html = ReactDOMServer.renderToString(
        <Provider store={store}>
            <StaticRouter
                location={req.url}
                context={context}
            >
                <App/>
            </StaticRouter>
        </Provider>
    )

    if (context.url) {
        res.writeHead(301, {
            Location: context.url
        })
        res.end()
    } else {
        res.write(`
      <!doctype html>
      <div id="app">${html}</div>
    `)
        res.end()
    }
}).listen(3000)
