import Add from '../components/Add'
import Decrease from '../components/Decrease'
import React from "react";
const NoMatch = ({ location }) => (
    <div>
        <h3>
            No match for <code>{location.pathname}</code>
        </h3>
    </div>
);

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
        exact: true,
        component: NoMatch
    },
];