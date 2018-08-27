
// index.js
// import '../css/test.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'


import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import routeConfig from './routes'
import App from './App';
import rootReducer from './reducers'

const store = createStore(rootReducer)
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)
// ReactDOM.render(<App/>, document.getElementById('app'));

// import(/* webpackChunkName: "lodash" */ './components/sum').then(f => console.log(f));

if (module.hot) {
    module.hot.accept('./App', () => {
        console.log('==============Accepting the updated printMe module!');
    })
}