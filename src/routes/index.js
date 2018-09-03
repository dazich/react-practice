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

function getSomeData() {
    console.info('getSomeData...')
}

export default [
    {
        path: "/",
        exact: true,
        component: Add,
        loadData: () => getSomeData()
    },
    {
        path: "/decrease",
        exact: true,
        component: Decrease,
        loadData: () => getSomeData()
    },
    {
        exact: true,
        component: NoMatch,
        loadData: () => getSomeData()
    },
];