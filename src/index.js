
// index.js
// import '../css/test.css'
import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, Link } from 'react-router'
import routeConfig from './routes'

// import App from './App';
ReactDOM.render(<Router routes={routeConfig} />, document.getElementById('app'))
// ReactDOM.render(<App/>, document.getElementById('app'));

// import(/* webpackChunkName: "lodash" */ './components/sum').then(f => console.log(f));

if (module.hot) {
    module.hot.accept('./App.js', function() {
        console.log('==============Accepting the updated printMe module!');
    })
}