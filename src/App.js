import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { hot } from 'react-hot-loader'
import routes from './routes'
import {cube} from './math'

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
        console.info(cube(123))
    }

    render() {
        return (
            <Switch>
                {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
            </Switch>
        )
    }
}

export default hot(module)(App);