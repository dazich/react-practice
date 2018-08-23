
// index.js
import '../css/test.css'
import './addImage'
import React from 'react';
import ReactDOM from 'react-dom';
import sum from './components/sum.js'

import App from './HelloWorld';
ReactDOM.render(<App/>, document.getElementById('app'))

if (module.hot) {
    module.hot.accept('./components/sum.js', function() {
        console.log('==============Accepting the updated printMe module!');
        sum();
    })
}