import App from '../App'
import Add from '../components/Add'
import Decrease from '../components/Decrease'
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const NoMatch = ({ location }) => (
    <div>
        <h3>
            No match for <code>{location.pathname}</code>
        </h3>
    </div>
);

const RouteWithSubRoutes = route => (
    <Route
        path={route.path}
        render={props => (
            // pass the sub-routes down to keep nesting
            <route.component {...props} routes={route.routes} />
        )}
    />
);

const Main = () => <h2>Main</h2>;

const Sandwiches = () => <h2>Sandwichessss</h2>;

const Tacos = ({ routes }) => (
    <div>
        <h2>Tacos</h2>
        <ul>
            <li>
                <Link to="/tacos/bus">Bus</Link>
            </li>
            <li>
                <Link to="/tacos/cart">Cart</Link>
            </li>
        </ul>

        {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
    </div>
);

const Bus = () => <h3>Bus</h3>;
const Cart = () => <h3>Cart</h3>;

export default [
    {
        path: "/",
        exact: true,
        component: Add
    },
    {
        path: "/decrease",
        exact: true,
        component: Decrease
    },
    {
        path: "/tacos",
        component: Tacos,
        routes: [
            {
                path: "/tacos/bus",
                component: Bus
            },
            {
                path: "/tacos/cart",
                component: Cart
            },
        ]
    },
    {
        exact: true,
        component: NoMatch
    },
];