import React, { Component } from 'react';
import { Router, Route, Switch } from "react-router-dom";
import { hot } from 'react-hot-loader'
import routes from './routes'
import history from './utils/history'

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

class App extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router history={history}>
                <Switch>
                    {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
                </Switch>
            </Router>
        )
    }
}

export default hot(module)(App);