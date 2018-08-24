
// index.js
import '../css/test.css'
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
ReactDOM.render(<App/>, document.getElementById('app'));

import(/* webpackChunkName: "lodash" */ './components/sum').then(f => console.log(f));

if (module.hot) {
    module.hot.accept('./App.js', function() {
        console.log('==============Accepting the updated printMe module!');
    })
}